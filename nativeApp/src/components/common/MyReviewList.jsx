import React from 'react';
import MyReview from './MyReview';

const MyReviewList = ({ reviews, setVisible, setPressedId }) => {
    if (reviews) {
        const reviewList = reviews.map(review => {
            const { review_id, user_name, content, star, path, updated_at, created_at } = review;
            return (
                <MyReview key={review_id}
                    setVisible={setVisible}
                    setPressedId={setPressedId}
                    review_id={review_id}
                    user_name={user_name}
                    content={content}
                    star={star}
                    path={path}
                    updated_at={updated_at}
                    created_at={created_at}
                />
            );
        });
        return <>{reviewList}</>;
    }
    return <></>;
};

export default MyReviewList;
