package com.wjbaker.gocart_api.interceptor;

import com.wjbaker.gocart_api.exception.ApiException;
import org.springframework.lang.NonNull;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public abstract class MethodHandlerInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(
            @NonNull final HttpServletRequest request,
            @NonNull final HttpServletResponse response,
            @NonNull final Object handler) throws Exception {

        if (handler instanceof HandlerMethod) {
            return this.intercept(request, response, (HandlerMethod)handler);
        }

        return true;
    }

    protected boolean intercept(
            final HttpServletRequest request,
            final HttpServletResponse response,
            final HandlerMethod handler) throws Exception {

        return true;
    }
}
