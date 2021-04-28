package com.wjbaker.gocart_api.data.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(schema = "auth", name = "user")
@Getter
@Setter
public final class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "reference", nullable = false, unique = true)
    private UUID reference;

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "password_salt", nullable = false)
    private UUID passwordSalt;
}
