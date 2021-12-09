package com.springboot.howaboutcafe.service;

import java.security.MessageDigest;
import java.util.regex.Pattern;

import com.springboot.howaboutcafe.dto.UserDTO;
import com.springboot.howaboutcafe.mapper.UserMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private static final int SUCCESS = 1;
    private static final int ALREADY_EXIST = 2;
    private static final int ID_INVALID = 3;
    private static final int ID_WRONG_LENGTH = 4;
    private static final int PW_WRONG_LENGTH = 5;
    private static final int NAME_INVALID = 6;
    private static final int NAME_WRONG_LENGTH = 7;

    private static String alg = "SHA-256";

    @Autowired
    UserMapper userMapper;

    public int createUser(UserDTO user) {
        try {
            String id = user.getUser_id();
            String pw = user.getPw();
            String name = user.getUser_name();
            String id_regEx = "^[0-9a-zA-Z]*$";
            String name_regEx = "^[0-9a-zA-Zㄱ-ㅎ가-힣]*$";

            if (id.length() < 4 || id.length() > 10)
                return ID_WRONG_LENGTH;
            if (!Pattern.matches(id_regEx, id))
                return ID_INVALID;

            if (pw.length() < 8 || pw.length() > 64)
                return PW_WRONG_LENGTH;

            if (!Pattern.matches(name_regEx, name))
                return NAME_INVALID;

            if (name.length() == 0 || name.length() > 20)
                return NAME_WRONG_LENGTH;

            user.setPw(encrypt(user.getPw()));

            int result = userMapper.insertUser(user);
            if (result == 1)
                return SUCCESS;
            return ALREADY_EXIST;

        } catch (Exception ex) {
            // 에러 처리
            throw new RuntimeException(ex);
        }
    }

    public String encrypt(String msg) throws Exception {
        MessageDigest md = MessageDigest.getInstance(alg);
        md.update(msg.getBytes());

        return bytesToHex(md.digest());

    }

    private String bytesToHex(byte[] bytes) {
        StringBuilder builder = new StringBuilder();
        for (byte b : bytes) {
            builder.append(String.format("%02x", b));
        }
        return builder.toString();
    }

}
