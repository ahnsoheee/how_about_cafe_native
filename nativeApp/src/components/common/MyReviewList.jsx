import React from 'react';
import MyReview from './MyReview';

const MyReviewList = ({ reviews, setVisible, setPressedId }) => {
    if (reviews) {
        const reviewList = reviews.map(review => {
            const { review_id, cafe_name, user_name, content, star, image, updated_at, created_at } = review;
            return (
                <MyReview key={review_id}
                    setVisible={setVisible}
                    setPressedId={setPressedId}
                    review_id={review_id}
                    cafe_name={cafe_name}
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

export default MyReviewList;
