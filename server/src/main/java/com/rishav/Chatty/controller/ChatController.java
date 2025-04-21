package com.rishav.Chatty.controller;

import com.rishav.Chatty.dto.ChatDTO;
import com.rishav.Chatty.dto.ChatMessageDTO;
import com.rishav.Chatty.dto.UserDTO;
import com.rishav.Chatty.repo.ChatRepo;
import com.rishav.Chatty.repo.MessageRepo;
import com.rishav.Chatty.services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
public class ChatController {

    @Autowired
    private ChatService chatService;

    @MessageMapping("/private-message")
    public void sendPrivateMessage(@Payload ChatMessageDTO message, Principal principal) {
        String senderEmail = principal.getName();  // Get the sender's email from Principal
        System.out.println("Received message: " + message.toString());

        // Call the service to handle the message sending logic
        chatService.sendPrivateMessage(message, senderEmail);
    }

    //this api returns the list of convo the current user has with other users
    @GetMapping("/allChats")
    @ResponseBody
    public ResponseEntity<List<ChatDTO>> getAllChats(Principal principal){
        List<ChatDTO> chats=chatService.getAllChats(principal);
        return  ResponseEntity.ok(chats);
    }
}
