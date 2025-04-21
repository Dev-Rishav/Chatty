package com.rishav.Chatty.dto;


import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
//@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ChatMessageDTO {
    private long id;
    private  String from;
    private  String to;
    private  String content;
    private LocalDateTime timestamp;

    private String fileUrl;

    public ChatMessageDTO(long id,String from,String to,String content,LocalDateTime timestamp,String fileUrl) {
        this.id = id;
        this.timestamp = timestamp;
        this.content = content;
        this.to = to;
        this.from = from;
        this.fileUrl = fileUrl;
    }

}
