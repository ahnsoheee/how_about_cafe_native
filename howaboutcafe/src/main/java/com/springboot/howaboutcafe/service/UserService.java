package com.springboot.howaboutcafe.service;

import java.security.MessageDigest;
import java.util.Date;
import java.util.regex.Pattern;

import com.springboot.howaboutcafe.dto.ResponseDTO;
import com.springboot.howaboutcafe.dto.UserDTO;
import com.springboot.howaboutcafe.mapper.UserMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class UserService {

    @Autowired
    UserMapper userMapper;

    // Main method

    public ResponseDTO editUserName(String user_name, String new_user_name) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            new_user_name = new_user_name.replaceAll("\\\"", "");
            if (user_name.equals(new_user_name)) {
                responseDTO.setResult("현재 닉네임입니다.");
                return responseDTO;
            }
            if (!validateNameReg(new_user_name)) {
                responseDTO.setResult("닉네임은 영어, 한글, 숫자만 포함해주세요.");
                return responseDTO;
            }
            if (!validateNameLength(new_user_name)) {
                responseDTO.setResult("닉네임은 최소 1, 최대 20 글자로 작성해주세요.");
                return responseDTO;
            }
            if (userMapper.isExistUserName(new_user_name) == 1) {
                responseDTO.setResult("이미 존재하는 닉네임입니다.");
                return responseDTO;
            }
            if (userMapper.editUserName(user_name, new_user_name) == 1) {
                responseDTO.setStatus(true);
                responseDTO.setResult("변경되었습니다.");
            }
            return responseDTO;

        } catch (Exception e) {
            // 에러 처리
            return responseDTO;
        }
    }

    public ResponseDTO deleteUser(String user_id) {
        ResponseDTO responseDTO = new ResponseDTO();

        int result = userMapper.deleteUser(user_id);
        if (result == 1) {
            responseDTO.setStatus(true);
            responseDTO.setResult("회원탈퇴가 완료되었습니다.");
        }
        return responseDTO;
    }

    public UserDTO auth(String token) {
        UserDTO userDTO = new UserDTO();

        token = token.replaceAll("\\\"", "");
        if (token != null && validateToken(token)) {
            Claims claims = getClaimFromToken(token);
            String user_id = (String) claims.get(DATA_KEY1);
            userDTO = userMapper.findById(user_id);
        }
        return userDTO;
    }

    public ResponseDTO signin(UserDTO user) {

        ResponseDTO responseDTO = new ResponseDTO();

        try {
            user.setPw(encrypt(user.getPw()));
            UserDTO result = userMapper.selectUser(user);
            if (result != null) {
                String token = generateToken(result);
                responseDTO.setStatus(true);
                responseDTO.setResult(token);
            } else {
                responseDTO.setResult("아이디 또는 비밀번호가 잘못 입력 되었습니다.");
            }
            return responseDTO;

        } catch (Exception ex) {
            // 에러 처리
            return responseDTO;
        }
    }

    public ResponseDTO signup(UserDTO user) {

        ResponseDTO responseDTO = new ResponseDTO();

        try {
            String id = user.getUser_id();
            String pw = user.getPw();
            String name = user.getUser_name();

            if (id.length() < 4 || id.length() > 10) {
                responseDTO.setResult("아이디는 최소 4, 최대 10 글자로 작성해주세요.");
                return responseDTO;
            }

            if (!id.matches("^[0-9a-zA-Z]*$")) {
                responseDTO.setResult("아이디는 영어, 숫자만 포함해주세요.");
                return responseDTO;
            }

            if (!Pattern.compile("^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z[0-9]!@#$%^&*]{8,64}$")
                    .matcher(pw).find()) {
                responseDTO.setResult("비밀번호는 숫자, 영어, 특수문자 !@#$%^&*를 포함해 최소 8, 최대 64 글자로 작성해주세요.");
                return responseDTO;
            }

            if (!validateNameReg(name)) {
                responseDTO.setResult("닉네임은 영어, 한글, 숫자만 포함해주세요.");
                return responseDTO;
            }

            if (!validateNameLength(name)) {
                responseDTO.setResult("닉네임은 최소 1, 최대 20 글자로 작성해주세요.");
                return responseDTO;
            }

            user.setPw(encrypt(user.getPw()));
            int isExistId = isExistUserId(user.getUser_id());
            int isExistName = isExistUserName(user.getUser_name());

            if (isExistId == 1) {
                responseDTO.setResult("이미 존재하는 아이디입니다.");
                return responseDTO;
            }

            if (isExistName == 1) {
                responseDTO.setResult("이미 존재하는 닉네임입니다.");
                return responseDTO;
            }

            int result = userMapper.insertUser(user);

            if (result == 1) {
                responseDTO.setStatus(true);
                responseDTO.setResult("회원가입을 완료했습니다");

                return responseDTO;
            }

            responseDTO.setResult("회원가입에 실패했습니다.");
            return responseDTO;

        } catch (Exception ex) {
            // 에러 처리
            return responseDTO;
        }
    }

    // Validation

    public boolean validateNameReg(String name) {
        String name_regEx = "^[0-9a-zA-Zㄱ-ㅎ가-힣]*$";
        if (!Pattern.matches(name_regEx, name))
            return false;
        return true;
    }

    public boolean validateNameLength(String name) {
        if (name.length() == 0 || name.length() > 20) {
            return false;
        }
        return true;
    }

    public boolean validateToken(String token) {
        try {
            return getClaimFromToken(token)
                    .getExpiration()
                    .after(new Date());
        } catch (ExpiredJwtException e) {
            return false;

        } catch (Exception e) {
            return false;
        }

    }

    // DB check
    public int isExistUserId(String user_id) {
        return userMapper.isExistUserId(user_id);
    }

    public int isExistUserName(String user_name) {
        return userMapper.isExistUserName(user_name);
    }

    // 암호화

    public String encrypt(String msg) throws Exception {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
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

    @Value("${JWT.SECRET_KEY}")
    private String SECRET_KEY;

    @Value("${JWT.DATA_KEY1}")
    private String DATA_KEY1;

    @Value("${JWT.DATA_KEY2}")
    private String DATA_KEY2;

    public String generateToken(UserDTO user) {

        long currTime = System.currentTimeMillis();
        String jwt = Jwts.builder()
                .setExpiration(new Date(currTime + 3600000))
                .setIssuedAt(new Date(currTime))
                .claim(DATA_KEY1, user.getUser_id())
                .signWith(SignatureAlgorithm.HS256, generateKey())
                .compact();

        return jwt;
    }

    public Claims getClaimFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(generateKey())
                .parseClaimsJws(token)
                .getBody();
    }

    public byte[] generateKey() {
        return SECRET_KEY.getBytes();
    }
}
