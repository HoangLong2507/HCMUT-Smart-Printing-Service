package com.crud_project.HCMUT.SSPS.repository;

import com.crud_project.HCMUT.SSPS.entity.SPSO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SPSORepository extends JpaRepository<SPSO,Long> {
    Optional<SPSO> findByEmail(String email);
}
