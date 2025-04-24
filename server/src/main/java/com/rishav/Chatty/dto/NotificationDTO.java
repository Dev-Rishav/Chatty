package com.rishav.Chatty.dto;

import java.time.LocalDateTime;

public class NotificationDTO {
    private String message;
    private LocalDateTime createdAt;

    public NotificationDTO(String message) {
        this.message = message;
        this.createdAt = LocalDateTime.now();
    }

    // Getters
    public String getMessage() {
        return message;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
