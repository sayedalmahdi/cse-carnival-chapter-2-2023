package com.reachout.backend.repository;

import com.reachout.backend.controller.DoctorController;
import com.reachout.backend.dto.doctorDto;
import com.reachout.backend.entity.District;
import com.reachout.backend.entity.Doctor;
import com.reachout.backend.entity.Specialization;
import com.reachout.backend.entity.Thana;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
//    List<Doctor> findBySpecializationNameAndDistrictAndThana(String specialization, District district, Thana thana);
@Query("SELECT NEW com.reachout.backend.dto.doctorDto(d.id, d.firstName, d.lastName, d.email, d.phoneNumber, " +
        "(SELECT s.name FROM Specialization s WHERE s.doctor = d)) " +
        "FROM Doctor d")List<doctorDto> findAllDoctorsAsDTO(Pageable pageable);

    @Query("SELECT NEW com.reachout.backend.dto.doctorDto(d.id, d.firstName,  d.lastName, d.email, d.phoneNumber, s.name) FROM Doctor d " +
            "LEFT JOIN d.specialization s " +
            "LEFT JOIN d.district dis " +
            "LEFT JOIN d.thana t " +
            "WHERE (:specializationName IS NULL OR s.name = :specializationName) " +
            "AND (:districtName IS NULL OR dis.name = :districtName) " +
            "AND (:thanaName IS NULL OR t.name = :thanaName)")
    List<doctorDto> filterAllDoctorsAsDTO(
            @Param("specializationName") String specializationName,
            @Param("districtName") String districtName,
            @Param("thanaName") String thanaName,
            Pageable pageable
    );
}
