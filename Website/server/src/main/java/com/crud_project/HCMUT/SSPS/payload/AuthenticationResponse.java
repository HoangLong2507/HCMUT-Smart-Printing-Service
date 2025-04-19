package com.crud_project.HCMUT.SSPS.payload;

import com.crud_project.HCMUT.SSPS.DTO.BaseUserDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationResponse <T extends BaseUserDTO> {
    String token;
    private T user;
}
