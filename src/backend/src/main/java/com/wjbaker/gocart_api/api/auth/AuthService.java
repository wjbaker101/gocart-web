package com.wjbaker.gocart_api.api.auth;

import com.wjbaker.gocart_api.api.auth.type.*;
import com.wjbaker.gocart_api.data.entity.UserEntity;
import com.wjbaker.gocart_api.data.repository.UserRepository;
import com.wjbaker.gocart_api.exception.ApiBadRequestException;
import com.wjbaker.gocart_api.exception.ApiException;
import com.wjbaker.gocart_api.exception.ApiNotAuthorisedException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;

import static com.wjbaker.gocart_api.api.auth.type.JwtPayload.Key.USERNAME;

@Service
public final class AuthService {

    private final UserRepository userRepository;
    private final PasswordHelper passwordHelper;

    private final long expirationTime;
    private final byte[] signingKey;

    @Autowired
    public AuthService(
        final UserRepository userRepository,
        final PasswordHelper passwordHelper,
        final AuthConfig authConfig) {

        this.userRepository = userRepository;
        this.passwordHelper = passwordHelper;

        this.expirationTime = Duration.ofDays(10).toMillis();
        this.signingKey = authConfig.getSigningKey();
    }

    public LoginResponse login(final LoginRequest request) throws ApiException {
        var user = this.userRepository.findByUsernameIgnoreCase(request.getUsername())
            .orElseThrow(() -> new ApiBadRequestException("A user with this username does not exist. Please make sure you are logged in as this user and try again."));

        var isPasswordValid = this.passwordHelper.isPasswordValid(
            user.getPassword(),
            request.getPassword(),
            user.getPasswordSalt());

        if (!isPasswordValid)
            throw new ApiNotAuthorisedException();

        var expiry = Instant.now().plus(this.expirationTime, ChronoUnit.MILLIS);

        var jwtToken = Jwts.builder()
            .claim(USERNAME, user.getUsername())
            .setExpiration(new Date(expiry.toEpochMilli()))
            .signWith(Keys.hmacShaKeyFor(this.signingKey))
            .compact();

        var loginResponse = new LoginResponse();
        loginResponse.setLoginToken(jwtToken);

        return loginResponse;
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

    public void updateUser(final UserEntity user, final UpdateUserRequest request) throws ApiException {
        var existingUser = this.userRepository.findByUsernameIgnoreCase(request.getUsername());
        if (existingUser.isPresent() && !existingUser.get().getReference().equals(user.getReference()))
            throw new ApiBadRequestException("A user with this username already exists. Please choose a different one and try again.");

        var passwordSalt = UUID.randomUUID();
        var hashedPassword = this.passwordHelper.hashPassword(request.getPassword(), passwordSalt);

        user.setUsername(request.getUsername());
        user.setPassword(hashedPassword);
        user.setPasswordSalt(passwordSalt);

        this.userRepository.save(user);
    }

    public void deleteUser(final UserEntity user) throws ApiException {
        this.userRepository.delete(user);
    }
}
