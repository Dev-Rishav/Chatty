package com.rishav.Chatty.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        //this specifies that in which endpoint the client will communicate with
        registry.addEndpoint("/chat")   //connection establishment
                .setAllowedOrigins("http://localhost:5173")
                .withSockJS();  //enables the web socket fall back mechanism, basically if the web socket protocol starts acting up then it provides alternative approaches
    }

    //messageBroker is intermediate thingy to route messages
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {

        config.enableSimpleBroker("/topic", "/queue"); // "/topic" -> rooms, "/queue" -> private chats
        config.setApplicationDestinationPrefixes("/app");
        config.setUserDestinationPrefix("/user"); // Enables private message queues
        /// app/chat
        //server-side: @MessagingMapping("/chat)

    }
}
