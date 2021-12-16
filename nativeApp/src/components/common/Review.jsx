import React from 'react';
import styled from 'styled-components/native';
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
                    {path ? <Photo source={{ uri: path }} /> : <></>}
                </PhotoWrapper>
                <StarWrapper>
                    <Star star={star} />
                </StarWrapper>
            </RightWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.View`
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 10px;
  overflow: hidden;
  flex-direction: row;
  padding: 13px;
  margin-bottom: 15px;
  shadow-color: #000000;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  elevation: 3;
`;

const LeftWrapper = styled.View`
  width: 78%;
`;

const RightWrapper = styled.View`
  flex-grow: 1;
`;

const UserId = styled.Text`
  font-weight: bold;
  font-size: 20px;
  padding-bottom: 10px;
`;

const Content = styled.Text`
  font-size: 15px;
  padding-right: 5px;
`;

const PhotoWrapper = styled.View`
  flex-grow: 1;
`;

const Photo = styled.Image`
  width: 100%;
  height: 70px;
`;

const StarWrapper = styled.Text`
  margin-top: 20px;
  margin-left: 30px;
  flex-grow: 1;
`;

export default Review;
