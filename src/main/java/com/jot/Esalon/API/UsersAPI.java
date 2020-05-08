package com.jot.Esalon.API;

import com.jot.Esalon.Repository.UsersRepository;
import com.jot.Esalon.model.AuthenticationRequest;
import com.jot.Esalon.model.AuthenticationResponse;
import com.jot.Esalon.model.Users;
import net.minidev.json.JSONObject;
import net.minidev.json.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
//        methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.DELETE, RequestMethod.PUT}
//        ,allowedHeaders = {"Content-Type","Access-Control-Allow-Origins", "Authorization", "X-Requested-With"})
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
    public AuthenticationResponse addUserToDB(@RequestBody final Users users){
        AuthenticationResponse response = new AuthenticationResponse();
        try{
            repository.save(users);
        }
        catch (Exception e){
            System.out.println(e);
            response.username=null;
            response.isSuccess=false;
            return response;
        }
        //If user is added to the DB without any exception,
        //aotomatically login that user and return default loggedin response
        //Else, (see the catch part)
        response.isSuccess=true;
        response.username=users.getUsername();
        return response;
        //return repository.findAll();

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
                    response.username = users.getUsername();
                    response.isSuccess = true;
                    httpResponse.setStatus(200);
                    return response;
                }
            }
        }
        response.isSuccess = false;
        response.username = null;
        httpResponse.setStatus(200);
        return response;
    }
}
