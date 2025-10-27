package com.example.employee_management_backend.model;


import jakarta.persistence.*;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="users")
@ToString
public class User {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


//    @Column(unique = true)
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

}
