package com.jot.Esalon.API;

import com.jot.Esalon.Repository.UsersRepository;
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

    @GetMapping(value = "/all")
    private List<Users> getAll(){
        return repository.findAll();
    }

    @PostMapping(value = "/addUser")
    public List<Users> addUserToDB(@RequestBody final Users users){
        repository.save(users);
        return repository.findAll();
    }


}
