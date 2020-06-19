package com.jot.Esalon.Repository;

import com.jot.Esalon.model.Booking;
import com.jot.Esalon.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;

public interface BookingsRepository extends JpaRepository<Booking,Integer> {
    List<Booking> findByUidInBooking(Integer uid);
}
