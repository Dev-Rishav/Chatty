package com.rishav.Chatty.services;


import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.rishav.Chatty.dto.ChatDTO;
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

import java.io.IOException;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.*;

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
    @Autowired
    private MessageRepo messageRepo;

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
        msg.setFile_url(message.getFileUrl());
        msg=messageRepository.save(msg);

        // Populate response DTO
        ChatMessageDTO chatMessageDTO = new ChatMessageDTO();
        chatMessageDTO.setId(msg.getId());
        chatMessageDTO.setTo(receiverEmail);
        chatMessageDTO.setFrom(senderEmail);  // sender is the email from the principal
        chatMessageDTO.setContent(message.getContent());
        chatMessageDTO.setTimestamp(msg.getTimestamp());
        chatMessageDTO.setFileUrl(msg.getFile_url());

        // Send the message to the recipient via WebSocket
        messagingTemplate.convertAndSendToUser(
                receiverEmail,
                "/queue/messages",
                chatMessageDTO
        );

        System.out.println("Message saved and sent: " + msg);
    }

    public List<ChatDTO> getAllChats(Principal principal) {
        String currentUserEmail = principal.getName();

        // Step 1: Find all chat IDs involving current user
        List<Integer> chatIds = chatRepo.findChatIdsByUserEmail(currentUserEmail);
        if (chatIds.isEmpty()) return Collections.emptyList();

        // Step 2: Fetch latest message for each chat ID in a single query
        List<Message> latestMessages = messageRepo.findLatestMessagesForChats(chatIds);

        // Step 3: Build DTOs from messages
        List<ChatDTO> chatList = new ArrayList<>();
        for (Message message : latestMessages) {
            Chat chat = message.getChat();

            // Determine the other user in the chat
            String otherUserId = chat.getUser1Id().equals(currentUserEmail)
                    ? chat.getUser2Id()
                    : chat.getUser1Id();

            Users otherUser=usersRepo.findByEmail(otherUserId);

            ChatDTO dto = new ChatDTO();

            dto.setId(chat.getChatId());
            dto.setEmail(otherUser.getEmail());
            dto.setUsername(otherUser.getUsername());
            dto.setProfilePic(otherUser.getProfilePic());
            dto.setLastMessage(message.getContent());
            dto.setTimestamp(message.getTimestamp());
            dto.setFileUrl(message.getFile_url());

            chatList.add(dto);
        }

        return chatList;

    }
}