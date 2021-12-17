package com.springboot.howaboutcafe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.springboot.howaboutcafe.dto.ResponseDTO;
import com.springboot.howaboutcafe.dto.UserDTO;
import com.springboot.howaboutcafe.service.UserService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @PatchMapping("/edit/name/{user_name}")
    public ResponseDTO editUserName(@PathVariable("user_name") String user_name, @RequestBody String new_user_name) {
        ResponseDTO result = userService.editUserName(user_name, new_user_name);
        return result;
    }

    @PatchMapping("/delete/{user_name}")
    public ResponseDTO deleteUser(@PathVariable("user_name") String user_name) throws Exception {
        ResponseDTO result = userService.deleteUser(user_name);
        return result;
    }

    @PostMapping("/auth")
    public ResponseDTO auth(@RequestBody String token) throws Exception {
        ResponseDTO result = userService.auth(token);
        return result;
    }

    @PostMapping("/signin")
    public ResponseDTO signin(@RequestBody UserDTO user) throws Exception {

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