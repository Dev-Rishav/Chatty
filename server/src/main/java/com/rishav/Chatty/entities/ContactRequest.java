package com.rishav.Chatty.entities;

import com.rishav.Chatty.enums.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ContactRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Users sender;

    @ManyToOne
    private Users receiver;

    private LocalDateTime requestedAt;

    @Enumerated(EnumType.STRING)
    private Status status;

}

