package com.springboot.howaboutcafe.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserDTO {

    String user_id;
    String pw;
    String user_name;
}