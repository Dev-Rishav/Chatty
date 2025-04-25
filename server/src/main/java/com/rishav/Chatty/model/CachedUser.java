package com.rishav.Chatty.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.annotation.Id;

@RedisHash("User")
@Getter
@Setter
@RequiredArgsConstructor
@NoArgsConstructor
public class CachedUser {
    @Id
    private long id;
    private String username;
    private String email;

    // Getters and setters
}
