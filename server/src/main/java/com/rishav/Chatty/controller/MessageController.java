package com.rishav.Chatty.controller;


import com.rishav.Chatty.entities.Message;
import com.rishav.Chatty.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//this controller will handle one to one private chat request
@RestController
@RequestMapping("api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @MessageMapping("/sendMessage")
    @SendToUser("/queue/reply")
    public Message sendMessage(@RequestBody Message message){
        System.out.println("yes this is qwo");
        return  messageService.sendMessage(message);
    }

//    @GetMapping("/private/{userId}")
//    public List<Message> getPrivateMessages(@PathVariable String userId) {
//        return messageService.getPrivateMessages(userId);
//    }

}
