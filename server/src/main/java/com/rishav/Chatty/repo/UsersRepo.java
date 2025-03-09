package com.rishav.Chatty.repo;

import com.rishav.Chatty.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepo extends JpaRepository<Users,Integer> {

    Users findByUsername(String username);
    Users findByEmail(String email);
}
