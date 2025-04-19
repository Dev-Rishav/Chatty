package com.rishav.Chatty.dto;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ChatMessageDTO {
    private  String from;
    private  String to;
    private  String content;
}
