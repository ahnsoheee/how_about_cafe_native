import React from 'react';
import Review from './Review';

const ReviewList = ({ reviews }) => {
    if (reviews) {
        const reviewList = reviews.map(review => {
            return (
                <Review
                    key={review.id}
                    id={review.id}
                    user_name={review.user_name}
                    content={review.content}
                    star={review.star}
                    path={review.path}
                />
            );
        });
        return <>{reviewList}</>;
    }
    return <></>;
};

export default ReviewList;
