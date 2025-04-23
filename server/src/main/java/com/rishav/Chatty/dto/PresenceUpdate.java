package com.rishav.Chatty.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class PresenceUpdate {
    private String email;
    private boolean online;

    public PresenceUpdate() {}

    public PresenceUpdate(String email, boolean online) {
        this.email = email;
        this.online = online;
    }

}

