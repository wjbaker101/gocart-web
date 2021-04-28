package com.wjbaker.gocart_api.api.auth.interceptor;

import com.wjbaker.gocart_api.api.auth.AuthConfig;
import com.wjbaker.gocart_api.api.auth.type.JwtPayload;
import com.wjbaker.gocart_api.api.auth.type.RequireUser;
import com.wjbaker.gocart_api.data.repository.UserRepository;
import com.wjbaker.gocart_api.exception.ApiException;
import com.wjbaker.gocart_api.exception.ApiNotAuthorisedException;
import com.wjbaker.gocart_api.interceptor.MethodHandlerInterceptor;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collections;

import static com.wjbaker.gocart_api.api.auth.type.JwtPayload.Key.USERNAME;

@Component
public final class AuthInterceptor extends MethodHandlerInterceptor {

    private final UserRepository userRepository;

    private final byte[] signingKey;

    @Autowired
    public AuthInterceptor(final UserRepository userRepository, final AuthConfig authConfig) {
        this.userRepository = userRepository;

        this.signingKey = authConfig.getSigningKey();
    }

    @Override
    protected boolean intercept(
        final HttpServletRequest request,
        final HttpServletResponse response,
        final HandlerMethod handler) throws ApiException {

        if (handler.getMethod().getAnnotation(RequireUser.class) == null)
            return true;

        var header = request.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer "))
            throw new ApiNotAuthorisedException();

        var jwtPayload = this.parseJwtToken(header.replace("Bearer ", ""));

        if (jwtPayload == null)
            throw new ApiNotAuthorisedException();

        var user = this.userRepository.findByUsernameIgnoreCase(jwtPayload.getUsername())
            .orElseThrow(ApiNotAuthorisedException::new);

        var authentication = new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return true;
    }

    private JwtPayload parseJwtToken(final String jwtToken) {
        try {
            var claims = Jwts.parserBuilder()
                .setSigningKey(this.signingKey)
                .build()
                .parseClaimsJws(jwtToken)
                .getBody();

            return new JwtPayload(claims.get(USERNAME, String.class));
        }
        catch (Exception exception) {
            return null;
        }
    }
}
