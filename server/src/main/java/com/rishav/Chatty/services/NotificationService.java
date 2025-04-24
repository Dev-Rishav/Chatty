package com.rishav.Chatty.services;

import com.rishav.Chatty.entities.Notification;

import java.util.List;

public interface NotificationService {
    List<Notification> getNotificationsForUser(String userEmail);
}
