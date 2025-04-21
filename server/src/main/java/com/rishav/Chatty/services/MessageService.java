package com.rishav.Chatty.services;

import com.rishav.Chatty.dto.ChatMessageDTO;
import com.rishav.Chatty.entities.Chat;
import com.rishav.Chatty.entities.Message;
import com.rishav.Chatty.repo.ChatRepo;
import com.rishav.Chatty.repo.MessageRepo;
import com.rishav.Chatty.repo.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageService {

    private final MessageRepo messageRepository;
    private final UsersRepo usersRepo;
    private final ChatRepo chatRepo;
    private final MessageRepo messageRepo;

    @Autowired
    public MessageService(MessageRepo messageRepository, UsersRepo usersRepo, ChatRepo chatRepo, MessageRepo messageRepo) {
        this.messageRepository = messageRepository;
        this.usersRepo = usersRepo;
        this.chatRepo = chatRepo;
        this.messageRepo = messageRepo;
    }

    public List<ChatMessageDTO> getMessagesBetweenUsers( String user2) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String user1 = authentication.getName();

        //to maintain consistency in the ordering of the users, we compare the user ids and swap them if necessary
        String user1Id = user1;
        String user2Id = user2;
        if (user1Id.compareTo(user2Id) > 0) {
            String temp = user1Id;
            user1Id = user2Id;
            user2Id = temp;
        }

        //fetch the chat id
        Chat chat = chatRepo.findByUser1IdAndUser2Id(user1Id, user2Id);
        if(chat==null){
            return new ArrayList<>();
        }
        int chatId=chat.getChatId();

        //fetch the messages from the chat id
        List<Message> messages = messageRepo.findByChat_ChatId(chatId);




//        List<Message> messages=messageRepository.findChatBetweenUsers(user1, user2);
        return messages.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    private ChatMessageDTO mapToDTO(Message message) {
        return new ChatMessageDTO(
                message.getId(),
                message.getSender().getEmail(),
                message.getReceiver().getEmail(),
                message.getContent(),
                message.getTimestamp(),
                message.getFile_url()
        );
    }

}

