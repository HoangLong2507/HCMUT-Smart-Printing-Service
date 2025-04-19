package com.crud_project.HCMUT.SSPS.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

import java.util.Date;

public class SPSODTO extends  BaseUserDTO{
    @NotEmpty(message = "ID is required")
    private Long id;

    private String studentID;

    @NotEmpty
    @Email(message = "Please provide valid email")
    private String email;

    private String name;

    private Date last_login;
}
