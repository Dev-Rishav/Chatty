package com.rishav.Chatty.repo;

import com.rishav.Chatty.entities.ContactRequest;
import com.rishav.Chatty.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ContactRequestRepo extends JpaRepository<ContactRequest,Long> {

    boolean existsBySenderAndReceiver(Users sender, Users receiver);
    Optional<ContactRequest> findById(long id);
}
