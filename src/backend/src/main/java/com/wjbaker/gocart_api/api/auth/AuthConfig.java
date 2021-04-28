package com.wjbaker.gocart_api.api.auth;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource({"classpath:secret.properties"})
public class AuthConfig {

    @Getter
    private final byte[] signingKey;

    @Autowired
    public AuthConfig(@Value("${auth.signingKey}") final String signingKey) {
        this.signingKey = signingKey.getBytes();
    }
}
