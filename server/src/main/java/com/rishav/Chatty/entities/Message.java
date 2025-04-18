package com.rishav.Chatty.entities;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "messages")
public class Message {

    private String senderId;
    private String receiverId;
    private String messageType;
    private String content;

    private boolean isRead=false;
    private LocalDateTime timeStamp=LocalDateTime.now();
}
