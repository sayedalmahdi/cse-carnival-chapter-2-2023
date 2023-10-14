package com.reachout.backend.entity;

import com.reachout.backend.entity.Doctor.Doctor;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user; // Foreign Key to Patient Table

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id")
    private Doctor doctor; // Foreign Key to Healthcare Expert Table

    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String status; // e.g., scheduled, in progress, completed
    private String consultationType; // e.g., video, chat
    private String diagnosis; // if applicable

}
