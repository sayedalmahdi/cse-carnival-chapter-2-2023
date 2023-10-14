package com.reachout.backend.entity;

import com.reachout.backend.entity.District;
import com.reachout.backend.entity.Thana;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String Title;
    private String firstName;
    private String lastName;
    private Date dob;
    private String gender;

    @OneToOne
    @JoinColumn(name = "district_id")  // Name of the foreign key column in the Doctor table
    private District district;


    @OneToOne
    @JoinColumn(name = "thana_id")  // Name of the foreign key column in the Doctor table
    private Thana thana;

    private String nationId;
    private String bmdc;

    @OneToOne
    @JoinColumn(name = "doctor_type_id")  // Name of the foreign key column in the Doctor table
    private DoctorType doctorType;
    private String phoneNumber;
    private String email;
    private String password;
}
