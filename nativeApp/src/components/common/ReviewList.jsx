import React from 'react';
import styled from "styled-components";
import Review from './Review';

const ReviewList = ({ reviews }) => {
    if (reviews) {
        const reviewList = reviews.map(review => {
            const { review_id, user_name, content, star, image, updated_at, created_at } = review;
            return (
                <Review
                    key={review_id}
                    review_id={review_id}
                    user_name={user_name}
                    content={content}
                    star={star}
                    updated_at={updated_at}
                    created_at={created_at}
                    image={image}
                />
            );
        });
        return <>{reviewList}</>;
    }
    return <></>;
};

export default ReviewList;
