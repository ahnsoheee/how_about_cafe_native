import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Entypo';
import { Text } from 'react-native';
import Star from '../components/common/Star';
import Pencil from '../components/common/Pencil';
import ReviewList from '../components/common/ReviewList';
import PhotoList from '../components/common/PhotoList';

const DetailScreen = ({ navigation, route }) => {
    const [reviewList, setReviewList] = useState([]);
    const [photoList, setPhotoList] = useState([]);

    // 리뷰 가져오는 로직
    useEffect(() => {
        const reviews =
            [{ id: 1, user_id: "test", content: "좋아요!", star: 5 },
            { id: 2, user_id: "test", content: "시그니처메뉴인 버터크림라떼 꼭 드세요👍 진짜 맛있고 다들 이거 먹어여 도넛도 레몬크림 아주 상큼하고 당충전 제대로 넘 마시찌만 가격이 사악", star: 3, path: "https://reactnative.dev/img/tiny_logo.png" },
            { id: 3, user_id: "test", content: "시그니처메뉴인 버터크림라떼 꼭 드세요👍 진짜 맛있고 다들 이거 먹어여 도넛도 레몬크림 아주 상큼하고 당충전 제대로 넘 마시찌만 가격이 사악", star: 3, path: "https://reactnative.dev/img/tiny_logo.png" },
            { id: 4, user_id: "test", content: "시그니처메뉴인 버터크림라떼 꼭 드세요👍 진짜 맛있고 다들 이거 먹어여 도넛도 레몬크림 아주 상큼하고 당충전 제대로 넘 마시찌만 가격이 사악", star: 3, path: "https://reactnative.dev/img/tiny_logo.png" },
            { id: 5, user_id: "test", content: "시그니처메뉴인 버터크림라떼 꼭 드세요👍 진짜 맛있고 다들 이거 먹어여 도넛도 레몬크림 아주 상큼하고 당충전 제대로 넘 마시찌만 가격이 사악", star: 3, path: "https://reactnative.dev/img/tiny_logo.png" }];
        // Top 4 가져오는 로직
        setReviewList(reviews);

        // 리뷰 이미지 가져오는 로직
        const images = [{ id: 1, path: "https://reactnative.dev/img/tiny_logo.png" }, { id: 2, path: "https://reactnative.dev/img/tiny_logo.png" }, { id: 3, path: "https://reactnative.dev/img/tiny_logo.png" }, { id: 4, path: "https://reactnative.dev/img/tiny_logo.png" },];
        setPhotoList(images);
    }, []);

    const RegisterReview = () => {
        // 리뷰생성화면으로 이동
        navigation.navigate('Review', { user_name: route.params.user_name, id: route.params.id, navigation: navigation });
    };

    return (
        <Wrapper>
            <Button onPress={RegisterReview}>
                <Icon name="plus" size={25} color="#FF8E26" />
            </Button>
            <Title>{route.params.name}</Title>
            <Addr>{route.params.addr}</Addr>
            <ValueView>
                <Star star={route.params.star} />
                <Text>&nbsp;&nbsp;</Text>
                <Pencil review={route.params.review} />
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