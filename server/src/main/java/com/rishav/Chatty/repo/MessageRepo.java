package com.rishav.Chatty.repo;

import com.rishav.Chatty.entities.Message;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface MessageRepo  extends MongoRepository<Message,String> {
    List<Message> findBySenderId(String senderId);

    List<Message> findBySenderIdAndReceiverIdOrReceiverIdAndSenderId(String senderId1, String receiverId1, String senderId2, String receiverId2);
}
