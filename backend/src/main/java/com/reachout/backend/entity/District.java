package com.reachout.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.reachout.backend.entity.Doctor;
import com.reachout.backend.entity.User;
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
public class District {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String name;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;
//    @JsonIgnore
//    @OneToOne(mappedBy = "district")
//    private Doctor doctor;
//
//
//    @JsonIgnore
//    @OneToOne(mappedBy = "district")
//    private User user;


}
