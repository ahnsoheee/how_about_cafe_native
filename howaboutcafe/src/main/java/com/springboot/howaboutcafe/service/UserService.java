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

    public ResponseDTO editUserName(String user_name, String new_user_name) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            int isExistName = userMapper.findByName(new_user_name);
            if (isExistName == 1) {
                responseDTO.setResult("이미 존재하는 닉네임입니다.");
                return responseDTO;
            }
            int result = userMapper.editUserName(user_name, new_user_name);
            if (result == 1) {
                responseDTO.setStatus(true);
                responseDTO.setResult("변경되었습니다.");
            } else {
                // 에러 처리
                responseDTO.setResult("이미 존재하는 닉네임입니다.");
            }
            return responseDTO;
        } catch (Exception e) {
            // 에러 처리
            return responseDTO;
        }
    }

    public ResponseDTO deleteUser(String user_name) {
        ResponseDTO responseDTO = new ResponseDTO();

        int result = userMapper.deleteUser(user_name);
        if (result == 1) {
            responseDTO.setStatus(true);
            responseDTO.setResult("회원탈퇴가 완료되었습니다.");
        }
        return responseDTO;
    }

    public ResponseDTO auth(String token) {
        ResponseDTO responseDTO = new ResponseDTO();

        token = token.replaceAll("\\\"", "");
        if (token != null && validateToken(token)) {
            Claims claims = getClaimFromToken(token);
            String user_name = (String) claims.get(DATA_KEY2);
            responseDTO.setStatus(true);
            responseDTO.setResult(user_name);
        }
        return responseDTO;
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
            String id_regEx = "^[0-9a-zA-Z]*$";
            String name_regEx = "^[0-9a-zA-Zㄱ-ㅎ가-힣]*$";

            if (id.length() < 4 || id.length() > 10) {
                responseDTO.setResult("아이디는 최소 4, 최대 10 글자로 작성해주세요.");
                return responseDTO;
            }

            if (!Pattern.matches(id_regEx, id)) {
                responseDTO.setResult("아이디는 영어, 숫자만 포함해주세요.");
                return responseDTO;
            }

            if (pw.length() < 8 || pw.length() > 64) {
                responseDTO.setResult("비밀번호는 최소 8, 최대 64 글자로 작성해주세요.");
                return responseDTO;
            }

            if (!Pattern.matches(name_regEx, name)) {
                responseDTO.setResult("닉네임은 영어, 한글, 숫자만 포함해주세요.");
                return responseDTO;
            }

            if (name.length() == 0 || name.length() > 20) {
                responseDTO.setResult("이름은 최소 1, 최대 20 글자로 작성해주세요.");
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

    public int isExistUserId(String user_id) {
        return userMapper.findById(user_id);
    }

    public int isExistUserName(String user_name) {
        return userMapper.findByName(user_name);
    }

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
                .claim(DATA_KEY2, user.getUser_name())
                .signWith(SignatureAlgorithm.HS256, generateKey())
                .compact();

        return jwt;
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
