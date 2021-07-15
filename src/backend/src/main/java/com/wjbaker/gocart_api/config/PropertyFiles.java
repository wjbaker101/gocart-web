package com.wjbaker.gocart_api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@PropertySource({
    "classpath:application.properties",
    "classpath:secret.properties"
})
@Configuration
public class PropertyFiles {}
