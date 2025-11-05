package com.example.employee_management_backend.model;

import jakarta.persistence.*;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name="users")
@ToString
public class User implements UserDetails { // Implement UserDetails

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_name", nullable = false ,unique = true)
    private String username;

    @Column(name = "password", nullable = false )
    private String password;

    public User() {}

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    // --- Start of UserDetails Methods ---

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // For this simple app, we can just grant a default "USER" role.
        // In a real app, you might have a "roles" field in your User entity.
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public boolean isAccountNonExpired() {
        // You can add logic here if needed
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // You can add logic here if needed
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // You can add logic here if needed
        return true;
    }

    @Override
    public boolean isEnabled() {
        // You can add logic here if needed
        return true;
    }
    // --- End of UserDetails Methods ---
}
