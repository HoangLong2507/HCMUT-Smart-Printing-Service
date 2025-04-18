package com.crud_project.HCMUT.SSPS.security;

import com.crud_project.HCMUT.SSPS.entity.BaseUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Data
@AllArgsConstructor
public class CustomUserDetails implements UserDetails {
    private String password;
    private BaseUser user;
    private final Collection<? extends GrantedAuthority> authorities;

    public CustomUserDetails (BaseUser user, String password, String roles) {
        this.user = user;
        this.password = password;
        this.authorities = Collections.unmodifiableCollection(
                roles == null ? Collections.emptyList():
                        Stream.of(roles.split(","))
                                .map(role -> new SimpleGrantedAuthority(role.trim()))
                                .collect(Collectors.toCollection(ArrayList::new))
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    public String getRoles() {
        return this.authorities
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.user.getEmail();
    }

    public Long getId() {
        return this.user.getId();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
