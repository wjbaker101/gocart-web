package com.wjbaker.gocart_api.api.auth.type;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public final class CreateUserResponse {

    private UUID reference;

    private String username;
}
