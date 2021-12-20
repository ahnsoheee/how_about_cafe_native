import React from 'react';
import styled from 'styled-components/native';
import StarRating from "react-native-star-rating";

const MyReview = ({ review_id, user_name, content, star, image, updated_at, created_at, setVisible, setPressedId }) => {

    const onPress = () => {
        setPressedId(review_id);
        setVisible(true);
    };

    return (
        <Wrapper key={review_id}>
            <TopWrapper>
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
                </LeftWrapper>
                <DeleteButton onPress={() => onPress()}>삭제</DeleteButton>
            </TopWrapper>
            <Content>{content}</Content>
            {image ? <Photo source={{ uri: image }} /> : <></>}
        </Wrapper>

    );
};

const Wrapper = styled.View`
    width: 100%;
    height: auto;
    flex-direction: column;
    background-color: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 10px;
    overflow: visible;
    padding: 13px;  
    margin-bottom: 20px;
    box-shadow: 5px 5px 5px #dddddd;
    elevation: 3;
`;

const TopWrapper = styled.View`
    width: 100%;
    flex-direction: row;
`;

const LeftWrapper = styled.View`
    flex-grow: 9;
`;

const MiddleWrapper = styled.View`
    flex-direction: row;
    margin-bottom: 5px;
`;

const DeleteButton = styled.Text`
    flex-direction: 1;
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

const Text = styled.Text`
    width: 100%;
    font-size: 23px;
    text-align: center;
    font-weight: bold;
`;

export default MyReview;
