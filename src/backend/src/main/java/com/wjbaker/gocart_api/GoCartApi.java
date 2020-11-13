package com.wjbaker.gocart_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class GoCartApi extends SpringBootServletInitializer {

	public static void main(final String[] args) {
		SpringApplication.run(GoCartApi.class, args);
	}

	@Override
	protected SpringApplicationBuilder configure(final SpringApplicationBuilder application) {
		return application.sources(GoCartApi.class);
	}
}
