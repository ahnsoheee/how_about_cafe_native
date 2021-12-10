package com.springboot.howaboutcafe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;

import com.springboot.howaboutcafe.dto.ResponseDTO;
import com.springboot.howaboutcafe.dto.UserDTO;
import com.springboot.howaboutcafe.service.UserService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class UserController {

    @Autowired
    UserService userService;

    @ResponseBody
    @PostMapping("/signup")
    public ResponseDTO signup(@RequestBody UserDTO user, HttpServletResponse response) throws Exception {
        String result = userService.createUser(user);
        ResponseDTO responseDTO = new ResponseDTO(result);

        return responseDTO;
    }
}
