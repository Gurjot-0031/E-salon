package com.jot.Esalon.API;

import com.jot.Esalon.Repository.BookingsRepository;
import com.jot.Esalon.Repository.UsersRepository;
import com.jot.Esalon.model.AuthenticationRequest;
import com.jot.Esalon.model.AuthenticationResponse;
import com.jot.Esalon.model.Booking;
import com.jot.Esalon.model.Users;
import net.minidev.json.JSONObject;
import net.minidev.json.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
//        methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.DELETE, RequestMethod.PUT}
//        ,allowedHeaders = {"Content-Type","Access-Control-Allow-Origins", "Authorization", "X-Requested-With"})
@RequestMapping (value = "/rest/users")
public class UsersAPI {

    @Autowired
    UsersRepository repository;
    @Autowired
    BookingsRepository bookingsRepository;

    //@CrossOrigin(origins = "*")
    @GetMapping(value = "/all")
    private List<Users> getAll(){
        return repository.findAll();
    }

    @PostMapping(value = "/getUserDetails")
    public Users getUserByUserName(@RequestBody Users user){
        System.out.println("Mycppunrt uname "+ user.getUsername());
        return repository.findByUsername(user.getUsername());
    }

    //@CrossOrigin(origins = "*")
    @PostMapping(value = "/addUser")
    public AuthenticationResponse addUserToDB(@RequestBody final Users user){
        AuthenticationResponse response = new AuthenticationResponse();
        try{
            repository.save(user);
        }
        catch (Exception e){
            System.out.println(e);
            response.uid = -1;
            response.username=null;
            response.isSuccess=false;
            return response;
        }
        //If user is added to the DB without any exception,
        //automatically login that user and return default loggedin response
        //Else, (see the catch part)
        Users userFromDB = repository.findByUsername(user.getUsername());
        response.uid = userFromDB.getUid();
        response.username=userFromDB.getUsername();
        response.isSuccess=true;
        return response;
        //return repository.findAll();

    }

    @PostMapping(value = "/updateUser")
    public boolean updateUser(@RequestBody final Users user){
        Users tempUser;
        try{
            tempUser = repository.findByUsername(user.getUsername());
            tempUser.setName(user.getName());
            tempUser.setEmail(user.getEmail());
            tempUser.setPhone(user.getPhone());
            repository.save(tempUser);
            return true;
        }
        catch (Exception e){
            System.out.println("Error: User cannot be updated");
            return false;
        }
    }

    @PostMapping(value = "/getAllBookings")
    public List<Booking> getAllBookings(@RequestBody final Users user){
        List<Booking> list;
        System.out.println("TEst "+user.getUsername());
        Users tempUser = repository.findByUsername(user.getUsername());
        try{
            list = bookingsRepository.findByUidInBooking(tempUser.getUid());
            for(Booking booking: list)
                System.out.println(booking.toString());
            return list;
        }
        catch (Exception e){
            System.out.println("Error: Bookings cannot be fetched or no bookings for the user");
            return null;
        }
    }



    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public AuthenticationResponse authenticate(@RequestBody AuthenticationRequest request, HttpServletResponse httpResponse) throws Exception{
        List<Users> usersList = repository.findAll();
        System.out.println("REQ"+request.getUsername());
        System.out.println("REQ"+request.getPassword());
        AuthenticationResponse response = new AuthenticationResponse();
        for(Users users:usersList){
            if(users.getUsername().equals(request.getUsername())){
                if(users.getPassword().equals(request.getPassword())){
                    System.out.println("REs"+users.getUsername());
                    System.out.println("REs"+users.getPassword());
                    response.uid = users.getUid();
                    response.username = users.getUsername();
                    response.isSuccess = true;
                    return response;
                }
            }
        }
        response.uid = -1;
        response.isSuccess = false;
        response.username = null;
        return response;
    }
}
