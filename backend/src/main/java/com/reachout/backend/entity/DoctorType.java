package com.reachout.backend.entity;

import com.reachout.backend.entity.Doctor;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "doctor_type")
public class DoctorType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

//    @OneToOne(mappedBy = "doctorType")
//    private Doctor doctor;
}
