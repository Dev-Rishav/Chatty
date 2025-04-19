package com.rishav.Chatty.controller;


import com.rishav.Chatty.dto.ChatMessageDTO;
import com.rishav.Chatty.dto.UserDTO;
import com.rishav.Chatty.entities.Message;
import com.rishav.Chatty.repo.MessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.sql.Timestamp;
import java.util.Map;

@RestController
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private MessageRepo messageRepository;

    @MessageMapping("/private-message")
    public void sendPrivateMessage(@Payload ChatMessageDTO message, Principal principal) {
        System.out.println("Received message: " + message.toString());
        // Save to DB
        Message msg = new Message();
        msg.setSender(principal.getName());
        msg.setReceiver(message.getTo());
        msg.setContent(message.getContent());
        messageRepository.save(msg);

//        Map<UserDTO, String> userDTOMap = Map.of()
        ChatMessageDTO chatMessageDTO = new ChatMessageDTO();
        chatMessageDTO.setTo(message.getTo());
        chatMessageDTO.setFrom(principal.getName());    //get the emailId from principal
        chatMessageDTO.setContent(message.getContent());

        System.out.println("Saved message to DB: "+msg);
        // Send to recipient
        messagingTemplate.convertAndSendToUser(
                message.getTo(),
                "/queue/messages",
//                message.getContent()
//                Map.of("content",message.getContent())
                chatMessageDTO
        );
    }
}

