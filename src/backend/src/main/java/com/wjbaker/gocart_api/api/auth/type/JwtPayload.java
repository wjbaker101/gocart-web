package com.wjbaker.gocart_api.api.auth.type;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public final class JwtPayload {

    public static final class Key {

        public static String USERNAME = "u";
    }

    private final String username;
}
