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
                    updated_at={review.updated_at}
                    created_at={review.created_at}
                />
            );
        });
        return <>{reviewList}</>;
    }
    return <></>;
};

export default ReviewList;
