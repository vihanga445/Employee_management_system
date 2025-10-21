package com.example.employee_management_backend.repository;

import com.example.employee_management_backend.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    // All CRUD database methods are now available for the Employee entity.
}
