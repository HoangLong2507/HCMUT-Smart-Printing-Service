package com.crud_project.HCMUT.SSPS.security;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.time.Instant;
import java.util.Date;

@Component
@Slf4j
public class JwtTokenProvider {
    @Value("${jwt.expiration}")
    private  String JWT_EXPIRATION;

    @Value("${jwt.secretkey}")
    private  String JWT_SECRET;

    public String generatorToken(CustomUserDetails customUserDetails) {
        String username = customUserDetails.getUsername();
        String roles = customUserDetails.getRoles();
        Instant now = Instant.now();
        Instant expirationTime = now.plusMillis(Long.parseLong(JWT_EXPIRATION));
        return Jwts.builder()
                .setSubject(username)
                .claim("id", customUserDetails.getId())
                .claim("roles", roles)
                .claim("email", customUserDetails.getUsername())
                .issuedAt(Date.from(now))
                .setExpiration(Date.from(expirationTime))
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(JWT_SECRET));
    }
    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser()
                .verifyWith((SecretKey) key())
                .build()
                .parseSignedClaims(token)
                .getPayload().getSubject();
    }
    public boolean validateToken(String authToken) throws JwtException {
        try {
            Jwts.parser().verifyWith((SecretKey) key())
                    .build().parseSignedClaims(authToken);
        }
        catch (JwtException e) {
            throw new JwtException("Token is invalid");
        }
        return true;

    }
    public String getAccessTokenFromHeader(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
