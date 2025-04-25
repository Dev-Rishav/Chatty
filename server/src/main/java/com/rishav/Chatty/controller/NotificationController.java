package com.rishav.Chatty.controller;

import com.rishav.Chatty.entities.Notification;
import com.rishav.Chatty.services.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    public ResponseEntity<List<Notification>> getNotificationHistory(Authentication authentication) {
        String email = authentication.getName();
        List<Notification> notifications = notificationService.getNotificationsForUser(email);
        return ResponseEntity.ok(notifications);
    }
}
