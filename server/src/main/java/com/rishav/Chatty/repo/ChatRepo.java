package com.rishav.Chatty.repo;

import com.rishav.Chatty.entities.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChatRepo extends JpaRepository<Chat,Integer> {
    Chat findByUser1IdAndUser2Id(String user1Id, String user2Id);
}
