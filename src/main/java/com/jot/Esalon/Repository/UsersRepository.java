package com.jot.Esalon.Repository;

import com.jot.Esalon.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users,Integer> {
    Users findByUsername(String unameFromFrontEnd);
}
