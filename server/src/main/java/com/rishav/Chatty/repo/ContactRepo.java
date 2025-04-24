package com.rishav.Chatty.repo;

import com.rishav.Chatty.entities.Contact;
import com.rishav.Chatty.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepo extends JpaRepository<Contact,Long> {
    boolean existsByOwnerAndContact(Users sender, Users receiver);
}
