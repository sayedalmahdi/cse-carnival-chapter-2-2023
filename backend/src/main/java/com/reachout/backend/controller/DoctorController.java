package com.reachout.backend.controller;

import com.reachout.backend.dto.doctorDto;
import com.reachout.backend.entity.District;
import com.reachout.backend.entity.Doctor;
import com.reachout.backend.entity.Specialization;
import com.reachout.backend.entity.Thana;
import com.reachout.backend.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {
    @Autowired
    private DoctorRepository doctorRepository;

    @GetMapping("/filter")
    public ResponseEntity<List<doctorDto>> filterDoctors(
            @RequestParam(name = "specialization", required = false) String specialization,
            @RequestParam(name = "district", required = false) String district,
            @RequestParam(name = "thana", required = false) String thana,
            Pageable pageable
    ) {
       List<doctorDto> doctors = doctorRepository.filterAllDoctorsAsDTO(specialization, district, thana, pageable);
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/find")
    public ResponseEntity<List<doctorDto>> findDoctors(
            Pageable pageable
    ) {
        List<doctorDto> doctors = doctorRepository.findAllDoctorsAsDTO(pageable);
        return ResponseEntity.ok(doctors);
    }

}
