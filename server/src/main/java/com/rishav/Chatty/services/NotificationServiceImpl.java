package com.rishav.Chatty.services;

import com.rishav.Chatty.entities.Notification;
import com.rishav.Chatty.repo.NotificationRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepo notificationRepository;

    @Override
    public List<Notification> getNotificationsForUser(String userEmail) {
        return notificationRepository.findByReceiverEmailOrderByCreatedAtDesc(userEmail);
    }

}
