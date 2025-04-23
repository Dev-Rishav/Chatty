package com.rishav.Chatty.services;

import com.rishav.Chatty.dto.PresenceUpdate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.AbstractSubProtocolEvent;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class PresenceEventListener {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private Set<String> onlineUsers = ConcurrentHashMap.newKeySet();

    @EventListener
    public void handleSessionConnected(SessionConnectEvent event) {
        String email = getEmailFromEvent(event);
        onlineUsers.add(email);

        messagingTemplate.convertAndSend("/topic/presence", new PresenceUpdate(email, true));
    }

    @EventListener
    public void handleSessionDisconnected(SessionDisconnectEvent event) {
        String email = getEmailFromEvent(event);
        onlineUsers.remove(email);

        messagingTemplate.convertAndSend("/topic/presence", new PresenceUpdate(email, false));
    }

    private String getEmailFromEvent(AbstractSubProtocolEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        return accessor.getUser().getName(); // Make sure Principal is set correctly
    }

    public Set<String> getOnlineUsers() {
        return onlineUsers;
    }


}

