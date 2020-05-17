package com.jot.Esalon.API;

import com.jot.Esalon.Repository.ProductsRepository;
import com.jot.Esalon.model.Products;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
//        methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.DELETE, RequestMethod.PUT}
//        ,allowedHeaders = {"Content-Type","Access-Control-Allow-Headers", "Authorization", "X-Requested-With"})
@RequestMapping (value = "/rest/products")
public class BookingsAPI {

    @Autowired
    ProductsRepository repository;

//    @Autowired
//    private AuthenticationManager authenticationManager;

//    @Autowired
//    private JwtUtil jwtUtil;

//    @Autowired
//    private MyUserDetailsService userDetailsService;

    //@CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/all")
    private List<Products> getAll(HttpServletRequest request, HttpServletResponse response){
        response.setStatus(200);
        System.out.println(request.toString());
        System.out.println(response.toString());

        return repository.findAll();
    }

    //@CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/addProduct")
    public List<Products> addProductToDB(@RequestBody final Products product){
        repository.save(product);
        return repository.findAll();
    }

    //@CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(value = "/updateProduct")
    public Products updateProduct(@RequestBody final Products product){

        //repository.deleteById(product.getId());
        repository.save(product);
        return product;
    }

    //@CrossOrigin(origins = "http://localhost:3000")
//    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
//    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception{
//        try{
//            authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
//            );
//        }
//        catch (BadCredentialsException e){
//            throw new Exception("Incorrect username or password",e);
//        }
//        final UserDetails userDetails = userDetailsService
//                .loadUserByUsername(authenticationRequest.getUsername());
//        final String jwt = jwtUtil.generateToken(userDetails);
//
//        return ResponseEntity.ok(new AuthenticationResponse(jwt));
//    }


}