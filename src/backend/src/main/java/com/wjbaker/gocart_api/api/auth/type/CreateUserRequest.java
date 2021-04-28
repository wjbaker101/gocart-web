package com.wjbaker.gocart_api.api.auth.type;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public final class CreateUserRequest {

    private String username;

    private String password;
}
