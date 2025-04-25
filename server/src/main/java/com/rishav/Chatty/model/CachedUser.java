package com.rishav.Chatty.model;

import lombok.*;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.annotation.Id;

@RedisHash("User")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CachedUser {
    @Id
    private long id;
    private String username;
    private String email;

    // Getters and setters
}
