package com.reachout.backend.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ReviewsAndRatings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId; // Primary Key

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "appointment_id")
    private Appointment consultation; // Foreign Key to Consultation Table

    private int rating;
    private String comments;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user; // Foreign Key to Patient Table

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id")
    private Doctor doctor; // Foreign Key to HealthcareExpert Table
}

