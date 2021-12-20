import React from 'react';
import styled from "styled-components";
import Review from './Review';

const ReviewList = ({ reviews }) => {
    if (reviews) {
        const reviewList = reviews.map(review => {
            const { review_id, user_name, content, star, path, updated_at, created_at } = review;
            return (
                <Wrapper>
                    <Review
                        review_id={review_id}
                        user_name={user_name}
                        content={content}
                        star={star}
                        path={path}
                        updated_at={updated_at}
                        created_at={created_at}
                    />
                </Wrapper>
            );
        });
        return <>{reviewList}</>;
    }
    return <></>;
};

const Wrapper = styled.View`
    height: 100%;
`;

export default ReviewList;
