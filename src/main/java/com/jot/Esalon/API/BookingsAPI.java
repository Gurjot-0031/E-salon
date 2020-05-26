package com.jot.Esalon.API;

import com.jot.Esalon.Repository.BookingsRepository;
import com.jot.Esalon.model.Booking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping (value = "/rest/bookings")
public class BookingsAPI {

    @Autowired
    BookingsRepository repository;


    //@CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/all")
    private List<Booking> getAll(HttpServletRequest request, HttpServletResponse response){
        response.setStatus(200);
        System.out.println(request.toString());
        System.out.println(response.toString());

        return repository.findAll();
    }

    //@CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/addBooking")
    public List<Booking> addProductToDB(@RequestBody final Booking booking){
        System.out.println(booking.getStartDateTime());
        System.out.println(booking.getEndDateTime());
        repository.save(booking);
        return repository.findAll();
    }

    //@CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(value = "/updateBooking")
    public Booking updateProduct(@RequestBody final Booking booking){

        //repository.deleteById(product.getId());
        repository.save(booking);
        return booking;
    }
}