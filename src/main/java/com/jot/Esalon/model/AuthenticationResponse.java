package com.jot.Esalon.model;

public class AuthenticationResponse {
//    private final String jwt;
//
//    public AuthenticationResponse(String jwt) {
//        this.jwt = jwt;
//    }
//
//    public String getJwt() {
//        return jwt;
//    }

    public String username;
    //private String role;
    public boolean isSuccess;


    @Override
    public String toString() {
        return "AuthenticationResponse{" +
                "username='" + username + '\'' +
                ", isSuccess=" + isSuccess +
                '}';
    }
}
