package com.rishav.Chatty.controller;


import com.rishav.Chatty.entities.Users;
import com.rishav.Chatty.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin
@RestController
public class UserController {

    @Autowired
    private UserService userService;



    @PostMapping("/login")
    @ResponseBody
    public Map<String, Object> login(@RequestBody Users user) {
        System.out.println("the incoming object is "+user);
        return userService.verify(user);
    }

//    @GetMapping("/login")
//    @ResponseBody
//    public String greet(){
//        return  "Hello";
//    }

    @PostMapping("/register")
    @ResponseBody
    public Users register(@RequestBody  Users user)
    {
        System.out.println("teh incoming object is= "+user);
        return  userService.addUser(user);
    }



}
