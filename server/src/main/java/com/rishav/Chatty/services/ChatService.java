package com.rishav.Chatty.services;


import com.rishav.Chatty.dto.ChatMessageDTO;
import com.rishav.Chatty.entities.Chat;
import com.rishav.Chatty.entities.Message;
import com.rishav.Chatty.entities.Users;
import com.rishav.Chatty.repo.ChatRepo;
import com.rishav.Chatty.repo.MessageRepo;
import com.rishav.Chatty.repo.UsersRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ChatService {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private MessageRepo messageRepository;
    @Autowired
    private UsersRepo usersRepo;
    @Autowired
    private ChatRepo chatRepo;

    @Transactional
    public void sendPrivateMessage(ChatMessageDTO message, String senderEmail) {

        // Get  receiver from the DTO
        String receiverEmail = message.getTo();



        // Consistent ordering to prevent duplicate chats
        String user1Id = senderEmail;
        String user2Id = receiverEmail;
        if (user1Id.compareTo(user2Id) > 0) {
            String temp = user1Id;
            user1Id = user2Id;
            user2Id = temp;
        }

        // Fetch sender and receiver User entities from the UserRepository
        Users sender = usersRepo.findByEmail(senderEmail);
        Users receiver = usersRepo.findByEmail(receiverEmail);

        // Try to find existing chat with consistent ordering
        Chat chat = chatRepo.findByUser1IdAndUser2Id(user1Id, user2Id);

        // If no chat exists, create a new chat
        if (chat == null) {
            chat = new Chat();
            chat.setUser1Id(user1Id);
            chat.setUser2Id(user2Id);
            chat.setCreatedAt(LocalDateTime.now());
            chat=chatRepo.save(chat);
        }


        // Save the message to the database
        Message msg = new Message();
        msg.setSender(sender);
        msg.setReceiver(receiver);
        msg.setContent(message.getContent());
        msg.setChat(chat);
        messageRepository.save(msg);

        // Create a response DTO to send back to the client
        ChatMessageDTO chatMessageDTO = new ChatMessageDTO();
        chatMessageDTO.setTo(receiverEmail);
        chatMessageDTO.setFrom(senderEmail);  // sender is the email from the principal
        chatMessageDTO.setContent(message.getContent());

        // Send the message to the recipient via WebSocket
        messagingTemplate.convertAndSendToUser(
                receiverEmail,
                "/queue/messages",
                chatMessageDTO
        );

        System.out.println("Message saved and sent: " + msg);
    }
}