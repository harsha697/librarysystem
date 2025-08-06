package com.library.librarysystem.controller;

import com.library.librarysystem.model.User;
import com.library.librarysystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public User addUser(@RequestBody User user) {
        return userRepository.save(user);
    }
}
