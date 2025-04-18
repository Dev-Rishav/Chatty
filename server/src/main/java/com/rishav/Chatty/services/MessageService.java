package com.rishav.Chatty.services;


import com.rishav.Chatty.entities.Message;
import com.rishav.Chatty.repo.MessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepo messageRepo;

    public Message sendMessage(Message message){
        return messageRepo.save(message);
    }

    public List<Message> getChatHistory(String senderId){
        return messageRepo.findBySenderId(senderId);
    }
//
//    public List<Message> getPrivateMessages(String userId,String ) {
//        return messageRepo.findBySenderIdAndReceiverIdOrReceiverIdAndSenderId(userId);
//    }

}
