package com.crud_project.HCMUT.SSPS.security;

import com.crud_project.HCMUT.SSPS.entity.Customer;
import com.crud_project.HCMUT.SSPS.entity.SPSO;
import com.crud_project.HCMUT.SSPS.repository.CustomerRepository;
import com.crud_project.HCMUT.SSPS.repository.SPSORepository;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final CustomerRepository customerRepository;
    private final SPSORepository spsoRepository;
    private final HttpServletRequest request;

    @Autowired
    public CustomUserDetailsService(CustomerRepository customerRepository, SPSORepository spsoRepository, HttpServletRequest request) {
        this.customerRepository = customerRepository;
        this.spsoRepository = spsoRepository;
        this.request = request;
    }

    @Override
    public CustomUserDetails loadUserByUsername(String username)  {
        String requesturl = request.getRequestURL().toString();
        Optional<Customer> customer = customerRepository.findByEmail(username);
        Optional <SPSO> spso = spsoRepository.findByEmail(username);
        if (requesturl.contains("spso") && spso.isPresent()) {
            return new CustomUserDetails(spso.get(),spso.get().getPassword(),"ROLE_CUSTOMER,ROLE_SPSO");
        }
        else if (requesturl.contains("customer") && customer.isPresent()) {
            return new CustomUserDetails(customer.get(), customer.get().getPassword(), "ROLE_CUSTOMER");
        }
        if (customer.isPresent()) {
            return new CustomUserDetails(customer.get(), customer.get().getPassword(), "ROLE_CUSTOMER");
        }
        else if (spso.isPresent()) {
            return new CustomUserDetails(spso.get(),spso.get().getPassword(),"ROLE_CUSTOMER,ROLE_SPSO");
        }
        throw new UsernameNotFoundException("Can not find User with username " + username );
    }

}
