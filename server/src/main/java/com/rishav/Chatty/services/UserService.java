package com.rishav.Chatty.services;

import com.rishav.Chatty.dto.UserDTO;
import com.rishav.Chatty.entities.Users;
import com.rishav.Chatty.repo.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private UsersRepo repo;

    private final int saltRounds=12;

    private BCryptPasswordEncoder encoder=new BCryptPasswordEncoder(saltRounds);

    public Users addUser(Users user) {
        String email=user.getEmail();
        String username=email.substring(0,email.indexOf('@'));
        user.setUsername(username);
        user.setPassword(encoder.encode(user.getPassword()));
        Users savedUser=repo.save(user);
        System.out.println("savedUser= "+savedUser);
        return savedUser;
    }

    public Map<String,Object> verify(Users user) {
        Authentication authentication=
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword())
                );
        if(authentication.isAuthenticated()) {
//            return jwtService.generateToken(user.getUsername());
            String token=jwtService.generateToken(user.getEmail());
            Users authenticatedUser=repo.findByEmail(user.getEmail());
            System.out.println(token+"token");
            UserDTO userDTO=new UserDTO();
            userDTO.setUsername(authenticatedUser.getUsername());

            Map<String, Object> res=new HashMap<>();
            res.put("token",token);
            res.put("userDTO",userDTO);
            return res;
        }
        else
            return Collections.singletonMap("Message","failure");
    }

}