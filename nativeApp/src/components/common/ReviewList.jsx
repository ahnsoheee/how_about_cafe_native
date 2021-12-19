import React from 'react';
import Review from './Review';

const ReviewList = ({ reviews }) => {
    if (reviews) {
        const reviewList = reviews.map(review => {
            console.log(review.review_id);
            return (
                <Review
                    review_id={review.review_id}
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
