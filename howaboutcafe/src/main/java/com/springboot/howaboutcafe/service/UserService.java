package com.springboot.howaboutcafe.service;

import java.security.MessageDigest;
import java.util.Date;

import com.springboot.howaboutcafe.dto.ResponseDTO;
import com.springboot.howaboutcafe.dto.UserDTO;
import com.springboot.howaboutcafe.mapper.UserMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    public String test() {
        return "Success";
    }

    public ResponseEntity<ResponseDTO> editUserName(String user_name, String new_user_name) {
        new_user_name = new_user_name.replaceAll("\\\"", "");
        if (user_name != null && new_user_name != null) {
            new_user_name = new_user_name.trim();

            if (!validateNameReg(new_user_name)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(new ResponseDTO(false, "닉네임은 영어, 한글, 숫자만 포함해주세요."));
            }
            if (!validateNameLength(new_user_name)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(new ResponseDTO(false, "닉네임은 최소 1, 최대 20 글자로 작성해주세요."));
            }
            if (user_name.equals(new_user_name)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ResponseDTO(false, "현재 닉네임입니다."));
            }
            if (userMapper.isExistUserName(new_user_name) == 1) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(new ResponseDTO(false, "이미 존재하는 닉네임입니다."));
            }
            if (userMapper.editUserName(user_name, new_user_name) == 1) {
                return ResponseEntity.ok().body(new ResponseDTO(true, "변경되었습니다."));
            }
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ResponseDTO(false, "닉네임은 최소 1, 최대 20 글자로 작성해주세요."));
    }

    public ResponseEntity<ResponseDTO> deleteUser(String user_id) {
        int result = userMapper.deleteUser(user_id);
        if (result == 1) {
            return ResponseEntity.ok().body(new ResponseDTO(true, "회원탈퇴가 완료되었습니다."));
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseDTO(false, "회원탈퇴에 실패했습니다."));
    }

    public ResponseEntity<?> auth(String token) {
        token = token.replaceAll("\\\"", "");
        if (token != null && validateToken(token)) {
            Claims claims = getClaimFromToken(token);
            String user_id = (String) claims.get(DATA_KEY1);
            return ResponseEntity.ok().body(userMapper.findById(user_id));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseDTO(false, "인증 실패"));
    }

    public ResponseEntity<ResponseDTO> signin(UserDTO user) {
        try {
            user.setPw(encrypt(user.getPw()));
            UserDTO result = userMapper.selectUser(user);
            if (result == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ResponseDTO(false, "아이디 또는 비밀번호가 잘못 입력 되었습니다."));
            }
            String token = generateToken(result);
            return ResponseEntity.ok().body(new ResponseDTO(true, token));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseDTO(false, "로그인 실패"));
        }
    }

    public ResponseEntity<ResponseDTO> signup(UserDTO user) {
        if (user == null)
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ResponseDTO(false, "아이디, 비밀번호, 닉네임을 모두 입력해주세요."));

        String id = user.getUser_id();
        String pw = user.getPw();
        String name = user.getUser_name();

        if (id == null || id.length() < 4 || id.length() > 10) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ResponseDTO(false, "아이디는 최소 4, 최대 10 글자로 작성해주세요."));
        }

        if (pw == null || !id.matches("^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z[0-9]!@#$%^&*]{8,64}$")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ResponseDTO(false, "비밀번호는 숫자, 영어, 특수문자 !@#$%^&*를 포함해 최소 8, 최대 64 글자로 작성해주세요."));
        }

        if (name == null || !validateNameLength(name)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ResponseDTO(false, "닉네임은 최소 1, 최대 20 글자로 작성해주세요."));
        }

        if (!id.matches("^[0-9a-z]*$")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ResponseDTO(false, "아이디는 소문자 영어, 숫자만 포함해주세요."));
        }

        if (!validateNameReg(name)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new ResponseDTO(false, "닉네임은 영어, 한글, 숫자만 포함해주세요."));
        }

        String encryptedPw = encrypt(pw);
        if (encryptedPw == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseDTO(false, "회원가입 실패"));
        }
        user.setPw(encryptedPw);
        if (isExistUserId(id)) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ResponseDTO(false, "이미 존재하는 아이디입니다."));
        }

        if (isExistUserName(name)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ResponseDTO(false,
                    "이미 존재하는 닉네임입니다."));
        }

        if (userMapper.insertUser(user) == 1) {
            return ResponseEntity.ok().body(new ResponseDTO(true, "회원가입을 완료했습니다"));
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseDTO(false, "회원가입 실패"));
    }

    // Validation
    public boolean validateNameReg(String name) {
        if (!name.matches("^[0-9a-zA-Zㄱ-ㅎ가-힣]*$")) {
            return false;
        }
        return true;
    }

    public boolean validateNameLength(String name) {
        if (name.length() < 0 || name.length() > 20) {
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
    public boolean isExistUserId(String user_id) {
        if (userMapper.isExistUserId(user_id) == 1)
            return true;
        return false;
    }

    public boolean isExistUserName(String user_name) {
        if (userMapper.isExistUserName(user_name) == 1)
            return true;
        return false;
    }

    // 암호화
    public String encrypt(String msg) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(msg.getBytes());

            return bytesToHex(md.digest());
        } catch (Exception ex) {
            return null;
        }
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
