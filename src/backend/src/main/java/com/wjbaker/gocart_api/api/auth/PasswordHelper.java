package com.wjbaker.gocart_api.api.auth;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public final class PasswordHelper {

    private final UUID pepper;

    @Autowired
    public PasswordHelper() {
        this.pepper = UUID.fromString("9d723173-5d96-4d5e-adeb-f3184ebb44a9");
    }

    public String hashPassword(final String password, final UUID salt) {
        var concatenated = password + salt + pepper;

        return DigestUtils.sha256Hex(concatenated);
    }

    public boolean isPasswordValid(final String expectedPassword, final String password, final UUID salt) {
        var concatenated = password + salt + pepper;

        return expectedPassword.equals(DigestUtils.sha256Hex(concatenated));
    }
}
