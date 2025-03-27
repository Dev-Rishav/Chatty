package com.rishav.Chatty.controller;


import com.rishav.Chatty.entities.Message;
import com.rishav.Chatty.entities.Room;
import com.rishav.Chatty.repo.RoomRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rooms")
@CrossOrigin("*")
public class RoomController {

    @Autowired
    private RoomRepo roomRepo;
    //dependency injection
//    public RoomController(RoomRepo roomRepo){
//        this.roomRepo=roomRepo;
//    }

    //create room
    @PostMapping
    public ResponseEntity<?> createRoom(@RequestBody String roomId){
        if(roomRepo.findByRoomId(roomId) != null){
            //room already exists
            return ResponseEntity.badRequest().body("Room already exists");
        }
        else{
            Room room=new Room();
            room.setRoomId(roomId);
            Room savedRoom=roomRepo.save(room);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedRoom);
        }
    }

    //get room : join
    @GetMapping("/{roomId}")
    public  ResponseEntity<?> joinRoom(@PathVariable String roomId){
        Room room=roomRepo.findByRoomId(roomId);
        if(room==null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Room does not exists!");
        }
        else{
            return ResponseEntity.ok(room);

        }
    }


    //get message from a room
    @GetMapping("/{roomId}/messages")
    public  ResponseEntity<?> getMessages(@PathVariable  String roomId,
                                          @RequestParam(value="page", defaultValue="0",required=false) int page,
                                          @RequestParam(value="size",defaultValue = "20",required = false) int size){
        Room room=roomRepo.findByRoomId(roomId);
        if(room==null)
            return ResponseEntity.badRequest().build();
        //get message

        List<Message> messages=room.getMessages();
        //pagination
        int start=Math.max(0,messages.size()-(page+1)*size);
        int end=Math.min(messages.size(),start+size);

        List<Message> paginatedMessages= messages.subList(start,end);
        return ResponseEntity.ok(paginatedMessages);
    }

}
