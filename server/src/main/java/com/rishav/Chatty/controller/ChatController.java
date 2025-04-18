package com.rishav.Chatty.controller;


import com.rishav.Chatty.entities.Message;
import com.rishav.Chatty.entities.Room;
import com.rishav.Chatty.payload.MessageRequest;
import com.rishav.Chatty.repo.RoomRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Controller
@CrossOrigin("http://localhost:5173")
public class ChatController {
    @Autowired
    private RoomRepo roomRepo;

    //for sending and receiving addresses
    //this method will take the message as args from client and return value will be published to desired topic
    @MessageMapping("/sendMessage/{roomId}")    //app/sendMessage/{roomId}
    @SendTo("/topic/room/{roomId}") //subscribe

    public Message sendMessage(@DestinationVariable String roomId,  //check the differences between destination var and path var
                               @RequestBody MessageRequest request){
        Room room = roomRepo.findByRoomId(request.getRoomId());
        Message message=new Message();
        message.setContent(request.getContent());
        message.setSenderId(request.getSender());
        if(room!=null){
            room.getMessages().add(message);
            roomRepo.save(room);
        }else {
            throw new RuntimeException("Room not found!");
        }
        return  message;
    }


}