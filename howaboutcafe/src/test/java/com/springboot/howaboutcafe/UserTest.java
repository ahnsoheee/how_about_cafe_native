package com.springboot.howaboutcafe;

import com.springboot.howaboutcafe.dto.ResponseDTO;
import com.springboot.howaboutcafe.dto.UserDTO;
import com.springboot.howaboutcafe.exception.NotFoundException;
import com.springboot.howaboutcafe.service.UserService;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class UserTest {

    @Autowired
    UserService userService = new UserService();

    @Test
    public void signupTest() throws Exception {

        UserDTO user = new UserDTO();
        user.setUser_id("test4");
        user.setPw("test1234!");
        user.setUser_name("test4");

        ResponseEntity<ResponseDTO> result = userService.signup(user);

        assertEquals(200, result.getStatusCodeValue());
    }

    @Test
    public void signinTest() {
        UserDTO user = new UserDTO();

        String user_id = "test4";
        String pw = "test1234!";

        user.setUser_id(user_id);
        user.setPw(pw);

        // When
        ResponseEntity<ResponseDTO> result = userService.signin(user);

        // Then
        assertEquals(200, result.getStatusCodeValue());
    }

    @Test
    public void editNameTest() {
        // When
        ResponseEntity<ResponseDTO> result = userService.editUserName("test3", "editTest3");
        // Then
        assertEquals(200, result.getStatusCodeValue());
    }

    @Test
    public void deleteUserFailTest() {
        boolean result = false;
        // When
        try {
            userService.deleteUser("test3");
        } catch (NotFoundException e) {
            System.err.println(e);
            result = true;
        }
        // Then
        assertTrue(result);
    }
}
