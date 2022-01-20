package com.springboot.howaboutcafe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @PatchMapping("/{user_name}/edit/name")
    public ResponseEntity<ResponseDTO> editUserName(@PathVariable("user_name") String user_name,
            @RequestBody String new_user_name) {
        return userService.editUserName(user_name, new_user_name);
    }

    @PatchMapping("/{user_id}/delete")
    public ResponseEntity<ResponseDTO> deleteUser(@PathVariable("user_id") String user_id) throws Exception {
        return userService.deleteUser(user_id);
    }

    @PostMapping("/auth")
    public ResponseEntity<UserDTO> auth(@RequestBody String token) throws Exception {
        return userService.auth(token);
    }

    @PostMapping("/signin")
    public ResponseEntity<ResponseDTO> signin(@RequestBody UserDTO user) throws Exception {
        return userService.signin(user);
    }

    @ResponseBody
    @PostMapping("/signup")
    public ResponseEntity<ResponseDTO> signup(@RequestBody UserDTO user) throws Exception {
        return userService.signup(user);
    }
}