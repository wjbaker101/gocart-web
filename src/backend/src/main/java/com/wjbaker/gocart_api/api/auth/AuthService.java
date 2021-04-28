package com.wjbaker.gocart_api.api.auth;

import com.wjbaker.gocart_api.api.auth.type.CreateUserRequest;
import com.wjbaker.gocart_api.api.auth.type.CreateUserResponse;
import com.wjbaker.gocart_api.api.auth.type.UpdateUserRequest;
import com.wjbaker.gocart_api.data.entity.UserEntity;
import com.wjbaker.gocart_api.data.repository.UserRepository;
import com.wjbaker.gocart_api.exception.ApiBadRequestException;
import com.wjbaker.gocart_api.exception.ApiException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public final class AuthService {

    private final UserRepository userRepository;
    private final PasswordHelper passwordHelper;

    @Autowired
    public AuthService(final UserRepository userRepository, final PasswordHelper passwordHelper) {
        this.userRepository = userRepository;
        this.passwordHelper = passwordHelper;
    }

    public void login() {

    }

    public void logout() {

    }

    public CreateUserResponse createUser(final CreateUserRequest request) throws ApiException {
        var existingUser = this.userRepository.findByUsernameIgnoreCase(request.getUsername());

        if (existingUser.isPresent())
            throw new ApiBadRequestException("A user with this username already exists. Please choose a different one and try again.");

        var passwordSalt = UUID.randomUUID();
        var hashedPassword = this.passwordHelper.hashPassword(request.getPassword(), passwordSalt);

        var user = new UserEntity();
        user.setReference(UUID.randomUUID());
        user.setUsername(request.getUsername());
        user.setPassword(hashedPassword);
        user.setPasswordSalt(passwordSalt);

        this.userRepository.save(user);

        var createUserResponse = new CreateUserResponse();
        createUserResponse.setReference(user.getReference());
        createUserResponse.setUsername(user.getUsername());

        return createUserResponse;
    }

    public void updateUser(final UUID reference, final UpdateUserRequest request) throws ApiException {
        var user = this.userRepository.findByReference(reference)
            .orElseThrow(() -> new ApiBadRequestException("A user with this username does not exist. Please make sure you are logged in as this user and try again."));

        var existingUser = this.userRepository.findByUsernameIgnoreCase(request.getUsername());
        if (existingUser.isPresent() && existingUser.get().getReference() != user.getReference())
            throw new ApiBadRequestException("A user with this username already exists. Please choose a different one and try again.");

        var passwordSalt = UUID.randomUUID();
        var hashedPassword = this.passwordHelper.hashPassword(request.getPassword(), passwordSalt);

        user.setUsername(request.getUsername());
        user.setPassword(hashedPassword);
        user.setPasswordSalt(passwordSalt);

        this.userRepository.save(user);
    }

    public void deleteUser(final UUID reference) throws ApiException {
        var user = this.userRepository.findByReference(reference)
            .orElseThrow(() -> new ApiBadRequestException("A user with this username does not exist. Please make sure you are logged in as this user and try again."));

        this.userRepository.delete(user);
    }
}
