package com.rishav.Chatty.controller;


import com.rishav.Chatty.dto.ContactRequestDTO;
import com.rishav.Chatty.dto.NotificationDTO;
import com.rishav.Chatty.entities.Users;
import com.rishav.Chatty.services.ContactRequestService;
import com.rishav.Chatty.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContactController {

    @Autowired
    private UserService userService;

    @Autowired
    private ContactRequestService contactRequestService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/send-contact-request")
    public String handleContactRequest(ContactRequestDTO request) {
        return contactRequestService.sendContactRequest(request);
    }

    @MessageMapping("/accept-contact-request")
    public String handleAcceptContactRequest(long requestId) {
        return contactRequestService.acceptContactRequest(requestId);
    }
}

