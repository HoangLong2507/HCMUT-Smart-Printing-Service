package com.crud_project.HCMUT.SSPS.controller;

import com.crud_project.HCMUT.SSPS.DTO.BaseUserDTO;
import com.crud_project.HCMUT.SSPS.DTO.LoginDTO;
import com.crud_project.HCMUT.SSPS.payload.AuthenticationResponse;
import com.crud_project.HCMUT.SSPS.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login/customer")
    public ResponseEntity<?> loginCustomer(@RequestBody @Valid LoginDTO dto) {
        return ResponseEntity.ok(authService.authenticateUser(dto));
    }
}
