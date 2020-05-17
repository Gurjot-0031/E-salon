package com.jot.Esalon.Repository;

import com.jot.Esalon.model.Booking;
import com.jot.Esalon.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingsRepository extends JpaRepository<Booking,Integer> {
}
