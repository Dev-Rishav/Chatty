package com.rishav.Chatty.repo;

import com.rishav.Chatty.entities.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRepo extends JpaRepository<Chat,Integer> {
    Chat findByUser1IdAndUser2Id(String user1Id, String user2Id);

    @Query("SELECT c.chatId FROM Chat c WHERE c.user1Id = :email OR c.user2Id = :email")
    List<Integer> findChatIdsByUserEmail(@Param("email") String email);
}
