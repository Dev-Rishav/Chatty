package com.rishav.Chatty.controller;

import com.rishav.Chatty.services.PresenceEventListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/api/presence")
public class PresenceController {
    @Autowired
    private PresenceEventListener presenceEventListener;

    @GetMapping("/online")
    public Set<String> getOnlineUsers() {
        return presenceEventListener.getOnlineUsers();
    }
}

