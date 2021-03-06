package com.springboot.howaboutcafe.dto;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewDTO {
    int review_id;
    int cafe_id;
    String cafe_name;
    String user_id;
    String user_name;
    int star;
    Date updated_at;
    Date created_at;
    String content;
    String image;
}
