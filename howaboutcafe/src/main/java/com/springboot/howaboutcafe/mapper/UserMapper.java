package com.springboot.howaboutcafe.mapper;

import com.springboot.howaboutcafe.dto.UserDTO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    UserDTO selectUser(UserDTO user);

    int insertUser(UserDTO user);

    int findById(String user_id);

    int findByName(String user_name);

}
