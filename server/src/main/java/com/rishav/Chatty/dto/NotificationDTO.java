package com.rishav.Chatty.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NotificationDTO {
    private Long id;
    private boolean isRead;
    private String message;
    private LocalDateTime createdAt;

    public NotificationDTO(String message) {
        this.message = message;
        this.createdAt = LocalDateTime.now();
    }

}
