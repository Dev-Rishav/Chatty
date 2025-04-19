package com.rishav.Chatty.config;

import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;

public class MyWebSocketHandler extends TextWebSocketHandler {

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {
        // Handle incoming WebSocket messages here
        String username = session.getPrincipal().getName();  // Get the user from session (the username)
        System.out.println("Message from " + username + ": " + message.getPayload());
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        // Handle after the WebSocket connection is established
        String username = session.getPrincipal().getName();
        System.out.println(username + " connected!");
    }
}

