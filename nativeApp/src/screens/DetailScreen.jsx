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
    const { user_id, addr, cafe_id, cafe_name, review, star } = route.params;

    const getReview = useCallback(async () => {
        const result = await API.get(`/cafe/${cafe_id}/review`);
        if (result) setReviewList(result);
    }, [reviewList]);

    const getImage = useCallback(async () => {
        const result = await API.get(`/cafe/${cafe_id}/image`);
        if (result) setPhotoList(result);
    }, [photoList]);

    useFocusEffect(
        useCallback(() => {
            getReview();
            getImage();
        }, [])
    );

    const RegisterReview = () => {
        navigation.navigate('RegisterReview', { user_id: user_id, cafe_id: cafe_id });
    };

    return (
        <Wrapper>
            <Button onPress={RegisterReview}>
                <Icon name="plus" size={25} color="#FF8E26" />
            </Button>
            <Title>{cafe_name}</Title>
            <Addr>{addr}</Addr>
            <ValueView>
                <Star star={star} />
                <Text>&nbsp;&nbsp;</Text>
                <Pencil review={review} />
            </ValueView>
            <PhotoWrapper>
                <PhotoList photos={photoList} navigation={navigation} cafe_name={cafe_name} />
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