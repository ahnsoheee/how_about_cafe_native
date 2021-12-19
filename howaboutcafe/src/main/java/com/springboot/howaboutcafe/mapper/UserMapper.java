package com.springboot.howaboutcafe.mapper;

import com.springboot.howaboutcafe.dto.UserDTO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    UserDTO findById(String user_name);

    int editUserName(String user_name, String new_user_name);

    int deleteUser(String user_id);

    UserDTO selectUser(UserDTO user);

    int insertUser(UserDTO user);

    int isExistUserId(String user_id);

    int isExistUserName(String user_name);

}
