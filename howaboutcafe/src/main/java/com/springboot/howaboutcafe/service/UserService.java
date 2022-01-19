package com.springboot.howaboutcafe.service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;

import com.springboot.howaboutcafe.dto.UserDTO;
import com.springboot.howaboutcafe.exception.DuplicateException;
import com.springboot.howaboutcafe.exception.InternalServerException;
import com.springboot.howaboutcafe.exception.InvalidException;
import com.springboot.howaboutcafe.exception.NotFoundException;
import com.springboot.howaboutcafe.exception.UnauthorizedException;
import com.springboot.howaboutcafe.mapper.UserMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

    public ResponseEntity<String> editUserName(String user_name, String new_user_name) {
        new_user_name = new_user_name.replaceAll("\\\"", "");
        if (user_name == null || new_user_name == null)
            throw new InvalidException("닉네임은 최소 1, 최대 20 글자로 작성해주세요.");

        new_user_name = new_user_name.trim();

        if (!validateNameReg(new_user_name))
            throw new InvalidException("닉네임은 영어, 한글, 숫자만 포함해주세요.");

        if (!validateNameLength(new_user_name))
            throw new InvalidException("닉네임은 최소 1, 최대 20 글자로 작성해주세요.");

        if (user_name.equals(new_user_name))
            throw new InvalidException("현재 닉네임입니다.");

        if (isExistUserName(new_user_name))
            throw new DuplicateException("이미 존재하는 닉네임입니다.");

        if (userMapper.editUserName(user_name, new_user_name) == 1) {
            return ResponseEntity.ok().body("변경되었습니다.");
        }
        throw new InternalServerException("닉네임 변경 실패했습니다.");
    }

    public ResponseEntity<String> deleteUser(String user_id) {
        if (user_id == null)
            throw new InvalidException("회원탈퇴에 실패했습니다.");

        int result = userMapper.deleteUser(user_id);
        if (result == 1) {
            return ResponseEntity.ok().body("회원탈퇴가 완료되었습니다.");
        }
        throw new NotFoundException("존재하지 않는 아이디입니다.");
    }

    public ResponseEntity<UserDTO> auth(String token) {
        token = token.replaceAll("\\\"", "");
        if (token != null && validateToken(token)) {
            Claims claims = getClaimFromToken(token);
            String user_id = (String) claims.get(DATA_KEY1);
            return ResponseEntity.ok().body(userMapper.findById(user_id));
        }
        throw new UnauthorizedException("인증 실패");
    }

    public ResponseEntity<String> signin(UserDTO user) {
        if (user.getUser_id() == null || user.getPw() == null)
            throw new InvalidException("아이디와 비밀번호를 입력해주세요.");
        user.setPw(encrypt(user.getPw()));
        UserDTO result = userMapper.selectUser(user);
        if (result == null) {
            throw new NotFoundException("아이디 또는 비밀번호가 잘못 입력 되었습니다.");
        }
        String token = generateToken(result);
        return ResponseEntity.ok().body(token);
    }

    public ResponseEntity<String> signup(UserDTO user) {
        if (user.getUser_id() == null || user.getPw() == null || user.getUser_name() == null)
            throw new InvalidException("아이디, 비밀번호, 닉네임을 모두 입력해주세요.");

        String id = user.getUser_id();
        String pw = user.getPw();
        String name = user.getUser_name();

        if (id.length() < 4 || id.length() > 10)
            throw new InvalidException("아이디는 최소 4, 최대 10 글자로 작성해주세요.");

        if (!pw.matches("^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z[0-9]!@#$%^&*]{8,64}$"))
            throw new InvalidException("비밀번호는 숫자, 영어, 특수문자 !@#$%^&*를 포함해 최소 8, ;최대 64 글자로 작성해주세요.");

        if (!validateNameLength(name))
            throw new InvalidException("닉네임은 최소 1, 최대 20 글자로 작성해주세요.");

        if (!id.matches("^[0-9a-z]*$"))
            throw new InvalidException("아이디는 소문자 영어, 숫자만 포함해주세요.");

        if (!validateNameReg(name))
            throw new InvalidException("닉네임은 영어, 한글, 숫자만 포함해주세요.");

        user.setPw(encrypt(pw));
        if (isExistUserId(id))
            throw new DuplicateException("이미 존재하는 아이디입니다.");

        if (isExistUserName(name))
            throw new DuplicateException("이미 존재하는 닉네임입니다.");

        if (userMapper.insertUser(user) == 1)
            return ResponseEntity.ok().body("회원가입을 완료했습니다");

        throw new InternalServerException("회원가입에 실패했습니다.");
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
            throw new UnauthorizedException("토큰 만료");
        } catch (Exception ex) {
            throw ex;
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
        } catch (NoSuchAlgorithmException e) {
            throw new InternalServerException("NoSuchAlgorithmException");
        } catch (Exception ex) {
            throw ex;
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
