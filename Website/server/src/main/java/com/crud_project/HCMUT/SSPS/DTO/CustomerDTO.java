package com.crud_project.HCMUT.SSPS.DTO;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDTO extends BaseUserDTO {

    @NotEmpty(message = "ID is required")
    private Long id;

    private String studentID;

    @NotEmpty(message = "Email is required.")
    @Email(message = "Please provide a valid email address.")
    private String email;

    private String name;

    @NotNull(message = "Page remain is required")
    private int page_remain;

    private Date last_login;
}
