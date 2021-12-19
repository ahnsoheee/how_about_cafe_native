import React, { useState, useCallback } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Entypo';
import { Text } from 'react-native';
import Star from '../components/common/Star';
import Pencil from '../components/common/Pencil';
import ReviewList from '../components/common/ReviewList';
import PhotoList from '../components/common/PhotoList';
import { useFocusEffect } from "@react-navigation/native";
import { API } from "../api/api";

const DetailScreen = ({ navigation, route }) => {
    const [reviewList, setReviewList] = useState([]);
    const [photoList, setPhotoList] = useState([]);
    const { addr, id, name, review, star, user_name } = route.params;

    useFocusEffect(
        useCallback(() => {
            const getReview = async () => {
                const result = await API.get(`/review?cafe_id=${id}`);
                if (result) setReviewList(result);
            };

            //    // 리뷰 이미지 가져오는 로직
            //    const images = [{ id: 1, path: "https://reactnative.dev/img/tiny_logo.png" }, { id: 2, path: "https://reactnative.dev/img/tiny_logo.png" }, { id: 3, path: "https://reactnative.dev/img/tiny_logo.png" }, { id: 4, path: "https://reactnative.dev/img/tiny_logo.png" },];
            //    setPhotoList(images);
            //}, []);
            getReview();
        }, [])

    );

    const RegisterReview = () => {
        // 리뷰생성화면으로 이동
        navigation.navigate('Review', { user_name: user_name, id: id, navigation: navigation });
    };

    return (
        <Wrapper>
            <Button onPress={RegisterReview}>
                <Icon name="plus" size={25} color="#FF8E26" />
            </Button>
            <Title>{name}</Title>
            <Addr>{addr}</Addr>
            <ValueView>
                <Star star={star} />
                <Text>&nbsp;&nbsp;</Text>
                <Pencil review={review} />
            </ValueView>
            <PhotoWrapper>
                <PhotoList photos={photoList} />
            </PhotoWrapper>
            <ReviewWrapper>
                <ReviewList reviews={reviewList} />
            </ReviewWrapper>
        </Wrapper>
    );
};

const Wrapper = styled.ScrollView`
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    padding: 30px 20px;
`;

const Button = styled.Text`
    width: 100%;
    padding-top: 20px;
    text-align: right;
`;

const Title = styled.Text`
    width: 100%;
    text-align: center;
    font-weight: bold;
    font-size: 23px;
`;

const Addr = styled.Text`
    width: 100%;
    height: 80px;
    padding: 20px;
    font-weight: bold;
    font-size: 18px;
    text-align: center;
`;

const ValueView = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: center;
`;

const PhotoWrapper = styled.View`
    width: 100%;
    flex-direction: row;
    padding: 20px 0 30px 0;
    justify-content: center;
`;

const ReviewWrapper = styled.View`
    background-color: #ffffff;
`;

export default DetailScreen;