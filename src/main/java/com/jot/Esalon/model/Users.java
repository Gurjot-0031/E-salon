package com.jot.Esalon.model;
import javax.persistence.*;

@Entity
@Table(name = "USERS")
public class Users {

    @Id
    @GeneratedValue
    @Column(name = "uid")
    private Integer uid;
    @Column(name = "username" ,unique = true, nullable = false)
    private String username;
    @Column(name = "password" , nullable = false)
    private String password;
    @Column(name = "name" , nullable = false)
    private String  name;
    @Column(name = "email")
    private String email;
    @Column(name = "phone")
    private String phone;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }



    public Users() {
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String uname) {
        this.username = uname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}

