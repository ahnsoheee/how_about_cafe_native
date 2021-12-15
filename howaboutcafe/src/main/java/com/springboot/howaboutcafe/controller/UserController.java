package com.springboot.howaboutcafe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.springboot.howaboutcafe.dto.ResponseDTO;
import com.springboot.howaboutcafe.dto.UserDTO;
import com.springboot.howaboutcafe.service.UserService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/auth")
    public ResponseDTO auth(@RequestBody String token) {
        ResponseDTO result = userService.auth(token);
        return result;
    }

    @PostMapping("/signin")
    public ResponseDTO signin(@RequestBody UserDTO user) {

        ResponseDTO result = userService.signin(user);
        return result;
    }

    @ResponseBody
    @PostMapping("/signup")
    public ResponseDTO signup(@RequestBody UserDTO user) throws Exception {

        ResponseDTO result = userService.signup(user);
        return result;
    }
}
