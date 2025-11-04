package com.example.employee_management_backend.controller;

import com.example.employee_management_backend.model.User;
import com.example.employee_management_backend.repository.UserRepository;
//import com.example.employeemanagement.model.User;
//import com.example.employeemanagement.repository.UserRepository;
import com.example.employee_management_backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;



@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")

public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return "Username already exists!";
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "User registered successfully!";
    }

    @PostMapping("/signin")
    public Map<String, String> signin(@RequestBody User user) {
        Optional<User> existing = userRepository.findByUsername(user.getUsername());
        if (existing.isPresent() && passwordEncoder.matches(user.getPassword(), existing.get().getPassword())) {
            String token = jwtUtil.generateToken(user.getUsername());
            return Map.of("token", token);
        }
        return Map.of("error", "Invalid username or password");
    }

    @PostMapping("/signout")
    public Map<String, String> signout() {
        // In stateless JWT, logout is handled on client-side (by deleting token)
        return Map.of("message", "Signed out successfully");
    }
}

