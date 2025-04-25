package com.rishav.Chatty.repo;

import com.rishav.Chatty.entities.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepo extends JpaRepository<Notification,Long> {
    List<Notification> findByReceiverEmailOrderByCreatedAtDesc(String email);
}
