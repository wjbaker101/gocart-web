package com.wjbaker.gocart_api.api;

import com.wjbaker.gocart_api.type.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ApiController {

    @Autowired
    public ApiController() {}

    @RequestMapping("{?:(?:(?!api|img|js|css|\\.).)*}/**")
    public String useVueHistoryMode() {
        return "/index.html";
    }

    @ExceptionHandler
    public ApiResponse<String> handleErrors(final Exception exception) {
        return ApiResponse.error("Something went wrong.");
    }
}
