import React from 'react';
import styled from 'styled-components';
import Star from './Star';
const Review = ({ user_id, content, star, path }) => {
    return (
        <Wrapper>

            <LeftWrapper>
                <UserId>{user_id}</UserId>
                <Content>{content}</Content>
            </LeftWrapper>
            <RightWrapper>
                <PhotoWrapper>
                    {path ?
                        <Photo source={{ uri: path }} /> : <></>}
                </PhotoWrapper>
                <StarWrapper>
                    <Star star={star} />
                </StarWrapper>
            </RightWrapper>
        </Wrapper>)
}

const Wrapper = styled.View`
    width: 100%;
    background-color: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 10px;
    flex-direction: row;
    padding: 15px;
    margin-bottom: 15px;
    shadow-color: #000000;
    shadow-offset: { width: 0; height: 1 };
    shadow-opacity: 0.8;
    shadow-radius: 10px;
    elevation: 3;
`;

const LeftWrapper = styled.View`
    width: 78%;
`;

const RightWrapper = styled.View`
    padding-left: 10px;
    flex-grow: 1;
`;

const UserId = styled.Text`
    font-weight: bold;
    font-size: 20px;
    padding-bottom: 10px;
`;

const Content = styled.Text`
    font-size: 15px;
`;

const PhotoWrapper = styled.View`
    flex-grow: 1;
`;

const Photo = styled.Image`
    width: 70px;
    height: 70px;
`;

const StarWrapper = styled.Text`
    margin-top: 10px;
    text-align: right;
    flex-grow: 1;
`;

export default Review;