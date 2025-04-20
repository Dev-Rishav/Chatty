package com.rishav.Chatty.dto;


import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ChatMessageDTO {
    private long id;
    private  String from;
    private  String to;
    private  String content;
    private LocalDateTime timestamp;
}
