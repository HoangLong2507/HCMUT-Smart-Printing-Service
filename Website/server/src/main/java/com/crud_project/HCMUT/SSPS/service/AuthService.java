package com.crud_project.HCMUT.SSPS.service;

import com.crud_project.HCMUT.SSPS.DTO.BaseUserDTO;
import com.crud_project.HCMUT.SSPS.DTO.CustomerDTO;
import com.crud_project.HCMUT.SSPS.DTO.LoginDTO;
import com.crud_project.HCMUT.SSPS.DTO.SPSODTO;
import com.crud_project.HCMUT.SSPS.entity.BaseUser;
import com.crud_project.HCMUT.SSPS.entity.Customer;
import com.crud_project.HCMUT.SSPS.entity.SPSO;
import com.crud_project.HCMUT.SSPS.payload.AuthenticationResponse;
import com.crud_project.HCMUT.SSPS.repository.CustomerRepository;
import com.crud_project.HCMUT.SSPS.repository.SPSORepository;
import com.crud_project.HCMUT.SSPS.security.CustomUserDetails;
import com.crud_project.HCMUT.SSPS.security.JwtTokenProvider;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import java.util.Date;

@Service
@Transactional
public class AuthService {
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private SPSORepository spsoRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public AuthenticationResponse<BaseUserDTO> authenticateUser (LoginDTO loginDTO) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDTO.getEmail(),
                        loginDTO.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        BaseUser baseUser = customUserDetails.getUser();
        String token = jwtTokenProvider.generatorToken(customUserDetails);

        if (baseUser instanceof Customer customer) {
            customer.setLast_login(new Date());
            customerRepository.save(customer);
        } else if (baseUser instanceof SPSO spso) {
            spso.setLast_login(new Date());
            spsoRepository.save(spso);
        } else {
            throw new IllegalStateException("Unknown user type:" + baseUser.getClass().getName());

        }

        BaseUserDTO userDTO = null;
        if (baseUser instanceof Customer customer) {
            userDTO = modelMapper.map(customer, CustomerDTO.class);
        } else {
            SPSO spso = (SPSO) baseUser;
            userDTO = modelMapper.map(spso, SPSODTO.class);
        }

        return new AuthenticationResponse<BaseUserDTO>(token,userDTO);

    }
}
