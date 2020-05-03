package com.jot.Esalon.API;

import com.jot.Esalon.Repository.UsersRepository;
import com.jot.Esalon.model.AuthenticationRequest;
import com.jot.Esalon.model.AuthenticationResponse;
import com.jot.Esalon.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping (value = "/rest/users")
public class UsersAPI {

    @Autowired
    UsersRepository repository;

    //@CrossOrigin(origins = "*")
    @GetMapping(value = "/all")
    private List<Users> getAll(){
        return repository.findAll();
    }

    //@CrossOrigin(origins = "*")
    @PostMapping(value = "/addUser")
    public List<Users> addUserToDB(@RequestBody final Users users){
        repository.save(users);
        return repository.findAll();
    }

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public AuthenticationResponse authenticate(@RequestBody AuthenticationRequest request) throws Exception{
        List<Users> usersList = repository.findAll();
        System.out.println("REQ"+request.getUsername());
        System.out.println("REQ"+request.getPassword());
        AuthenticationResponse response = new AuthenticationResponse();
        for(Users users:usersList){
            if(users.getUsername().equals(request.getUsername())){
                if(users.getPassword().equals(request.getPassword())){
                    System.out.println("REs"+users.getUsername());
                    System.out.println("REs"+users.getPassword());
                    response.setUsername(users.getUsername());
                    response.setSuccess(true);
                    return response;
                }
            }
        }
        response.setSuccess(false);
        response.setUsername(null);
        return response;
    }
}
