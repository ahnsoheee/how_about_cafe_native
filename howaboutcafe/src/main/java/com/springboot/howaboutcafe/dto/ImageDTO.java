package com.springboot.howaboutcafe.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImageDTO {
    int image_id;
    int review_id;
    int cafe_id;
    String path;
}
