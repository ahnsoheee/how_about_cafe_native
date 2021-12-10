package com.springboot.howaboutcafe.service;

import java.security.MessageDigest;
import java.util.regex.Pattern;

import com.springboot.howaboutcafe.dto.ResponseDTO;
import com.springboot.howaboutcafe.dto.UserDTO;
import com.springboot.howaboutcafe.mapper.UserMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    // private static final int SUCCESS = 1;
    // private static final int ALREADY_EXIST_ID = 2;
    // private static final int ID_INVALID = 3;
    // private static final int ID_WRONG_LENGTH = 4;
    // private static final int PW_WRONG_LENGTH = 5;
    // private static final int NAME_INVALID = 6;
    // private static final int NAME_WRONG_LENGTH = 7;

    private static String alg = "SHA-256";

    @Autowired
    UserMapper userMapper;

    public ResponseDTO createUser(UserDTO user) {

        ResponseDTO responseDTO = new ResponseDTO();

        try {
            String id = user.getUser_id();
            String pw = user.getPw();
            String name = user.getUser_name();
            String id_regEx = "^[0-9a-zA-Z]*$";
            String name_regEx = "^[0-9a-zA-Zㄱ-ㅎ가-힣]*$";

            if (id.length() < 4 || id.length() > 10) {
                responseDTO.setMsg("아이디는 최소 4, 최대 10 글자로 작성해주세요.");
                return responseDTO;
            }

            if (!Pattern.matches(id_regEx, id)) {
                responseDTO.setMsg("아이디는 영어, 숫자만 포함해주세요.");
                return responseDTO;
            }

            if (pw.length() < 8 || pw.length() > 64) {
                responseDTO.setMsg("비밀번호는 최소 8, 최대 64 글자로 작성해주세요.");
                return responseDTO;
            }

            if (!Pattern.matches(name_regEx, name)) {
                responseDTO.setMsg("닉네임은 영어, 한글, 숫자만 포함해주세요.");
                return responseDTO;
            }

            if (name.length() == 0 || name.length() > 20) {
                responseDTO.setMsg("이름은 최소 1, 최대 20 글자로 작성해주세요.");
                return responseDTO;
            }

            user.setPw(encrypt(user.getPw()));

            int isExistId = isExistUserId(user.getUser_id());
            int isExistName = isExistUserName(user.getUser_name());

            if (isExistId == 1) {
                responseDTO.setMsg("이미 존재하는 아이디입니다.");
                return responseDTO;
            }

            if (isExistName == 1) {
                responseDTO.setMsg("이미 존재하는 닉네임입니다.");
                return responseDTO;
            }

            int result = userMapper.insertUser(user);

            if (result == 1) {
                responseDTO.setStatus(true);
                responseDTO.setMsg("회원가입을 완료했습니다");

                return responseDTO;
            }

            responseDTO.setMsg("회원가입에 실패했습니다.");
            return responseDTO;

        } catch (Exception ex) {
            // 에러 처리
            throw new RuntimeException(ex);
        }
    }

    public int isExistUserId(String user_id) {
        return userMapper.findById(user_id);
    }

    public int isExistUserName(String user_name) {
        return userMapper.findByName(user_name);
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
