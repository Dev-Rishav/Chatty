package com.rishav.Chatty.repo;

import com.rishav.Chatty.entities.Chat;
import com.rishav.Chatty.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepo extends JpaRepository<Message, Long> {
    @Query("SELECT m FROM Message m WHERE " +
            "(m.sender.email = :user1Email AND m.receiver.email = :user2Email) OR " +
            "(m.sender.email = :user2Email AND m.receiver.email = :user1Email) " +
            "ORDER BY m.timestamp ASC")
    List<Message> findChatBetweenUsers(@Param("user1Email") String user1Email,
                                       @Param("user2Email") String user2Email);


    List<Message> findByChat_ChatId(int chatId);



    @Query("""
    SELECT m FROM Message m
    WHERE m.timestamp IN (
        SELECT MAX(m2.timestamp) FROM Message m2
        WHERE m2.chat.chatId IN :chatIds
        GROUP BY m2.chat.chatId
    )
    """)
    List<Message> findLatestMessagesForChats(@Param("chatIds") List<Integer> chatIds);
}
