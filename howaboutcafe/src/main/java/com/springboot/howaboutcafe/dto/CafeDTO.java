package com.springboot.howaboutcafe.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CafeDTO {
    int cafe_id;
    String cafe_name;
    String addr;
}
