package com.rishav.Chatty.config;



import com.rishav.Chatty.services.JWTService;
import com.rishav.Chatty.services.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import java.net.URI;
import java.security.Principal;
import java.util.Map;

@Configuration
public class CustomHandshakeHandler extends DefaultHandshakeHandler {
    @Autowired
    private JWTService jwtService;

    @Autowired
    private MyUserDetailsService userDetailsService;

    @Override
    protected Principal determineUser(ServerHttpRequest request,
                                      WebSocketHandler wsHandler,
                                      Map<String, Object> attributes) {
        // Extract Authorization header
        URI uri = request.getURI();
        String query = uri.getQuery();
        if (query != null && query.startsWith("token=")) {
            String token = query.substring(6);
            System.out.println("Token for handshake: " + token);
            String username = jwtService.extractUsername(token);

            if (username != null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                if (jwtService.validateToken(token, userDetails)) {
                    return () -> username; // Custom Principal
                }
                else {
                    System.out.println("Invalid token");
                    return () -> "Anonymous User";
                }
            }
            else{
                System.out.println("User not found in token");
                return () -> "Anonymous User";
            }
        }
        return null;
    }
}

