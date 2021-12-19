import React from 'react';
import styled from 'styled-components/native';
import StarRating from "react-native-star-rating";

const Review = ({ review_id, user_name, content, star, path, updated_at, created_at }) => {
    return (
        <Wrapper key={review_id}>
            <LeftWrapper>
                <UserId>{user_name}</UserId>
                <MiddleWrapper>
                    <StarWrapper>
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            starSize={13}
                            fullStarColor={"#FF8E26"}
                            emptyStarColor={"#FF8E26"}
                            rating={star} />
                    </StarWrapper>
                    <Date>{created_at.substring(0, 10)}</Date>
                </MiddleWrapper>
                <Content>{content}</Content>
            </LeftWrapper>
            {path ? <Photo source={{ uri: path }} /> : <></>}
        </Wrapper>
    );
};

const Wrapper = styled.View`
    width: 100%;
    background-color: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 10px;
    overflow: visible;
    padding: 13px;
    margin-bottom: 15px;  
    box-shadow: 5px 5px 5px #dddddd;
    elevation: 3;
`;

const LeftWrapper = styled.View`
    width: 78%;
`;

const MiddleWrapper = styled.View`
    flex-direction: row;
    margin-bottom: 5px;
`;

const UserId = styled.Text`
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 5px;
`;

const StarWrapper = styled.View`
    margin-bottom: 3px;
    margin-right: 3px;
`;

const Date = styled.Text`
    font-size: 12px;
    color: #848484;
`;

const Content = styled.Text`
    font-size: 19px;
    margin-bottom: 10px;
`;


const Photo = styled.Image`
    width: 100%;
    height: 300px;
`;

export default Review;
