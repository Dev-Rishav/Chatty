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

import java.util.*;

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

    public Map<String, String> addUser(Users user) {
        Map<String, String> response = new HashMap<>();
        try {
            // Validate email
            String email = user.getEmail();
            if (email == null || !email.contains("@")) {
                response.put("status", "error");
                response.put("message", "Invalid email address");
                return response;
            }

            // Check if user already exists
            Users existingUser = repo.findByEmail(email);
            if (existingUser != null) {
                response.put("status", "error");
                response.put("message", "User with this email already exists");
                return response;
            }

            // Generate username from email
            String username = email.substring(0, email.indexOf('@'));
            user.setUsername(username);

            // Encrypt password
            user.setPassword(encoder.encode(user.getPassword()));

            // Save user
            repo.save(user);
            response.put("status", "success");
            response.put("message", "User registered successfully");
            return response;
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "An unexpected error occurred: " + e.getMessage());
            return response;
        }
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
            System.out.println("token= "+token);
            UserDTO userDTO=new UserDTO();
            userDTO.setUsername(authenticatedUser.getUsername());
            userDTO.setEmail(authenticatedUser.getEmail());
            userDTO.setUser_id(authenticatedUser.getUser_id());

            Map<String, Object> res=new HashMap<>();
            res.put("token",token);
            res.put("userDTO",userDTO);
            return res;
        }
        else
            return Collections.singletonMap("Message","failure");
    }

    public List<UserDTO> getAllUsers() {

        List<Users>  allUsers =repo.findAll();
        List<UserDTO> allUsersDTO=new ArrayList<>();
        for(int i=0;i<allUsers.size();i++){
            UserDTO userDTO=new UserDTO();
            userDTO.setUsername(allUsers.get(i).getUsername());
            userDTO.setEmail(allUsers.get(i).getEmail());
            userDTO.setUser_id(allUsers.get(i).getUser_id());
            allUsersDTO.add(userDTO);
        }
        return allUsersDTO;
    }


    public Users findByEmail(String receiverEmail) {
        return repo.findByEmail(receiverEmail);
    }
}