package com.springboot.howaboutcafe;

import com.springboot.howaboutcafe.dto.UserDTO;
import com.springboot.howaboutcafe.service.UserService;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class UserTest {

    @Autowired
    UserService userService = new UserService();

    @Test
    public void signupTest() throws Exception {

        UserDTO user = new UserDTO();
        user.setUser_id("test3");
        user.setPw("test1234!");
        user.setUser_name("test3");

        ResponseEntity<String> result = userService.signup(user);

        assertEquals(200, result.getStatusCodeValue());
    }

    @Test
    public void signinTest() {
        UserDTO user = new UserDTO();

        String user_id = "test12";
        String pw = "test1234!";

        user.setUser_id(user_id);
        user.setPw(pw);

        // When
        ResponseEntity<String> result = userService.signin(user);

        // Then
        assertEquals(200, result.getStatusCodeValue());
    }

    @Test
    public void editNameTest() {
        // When
        ResponseEntity<String> result = userService.editUserName("test3", "editTest3");
        // Then
        assertEquals(200, result.getStatusCodeValue());
    }
}
