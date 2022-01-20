import React, { useEffect } from 'react';
import { useState, useCallback } from 'react';
import styled from 'styled-components/native';
import { API } from '../api/api';
import { View, Text } from 'react-native';
import { Modal, Provider } from '@ant-design/react-native';
import SimpleToast from "react-native-simple-toast";
import StarRating from "react-native-star-rating";

const MyReviewScreen = ({ navigation, route }) => {
    const user_id = route.params.user_id;
    const [reviews, setReviews] = useState('');
    const [visible, setVisible] = useState(false);
    const [pressedId, setPressedId] = useState(0);

    const footerButtons = [
        { text: '취소' },
        { text: '삭제', onPress: () => deleteReview() }
    ];

    useEffect(() => {
        getMyReviews();
        return () => {
            setVisible(false);
            setPressedId(review_id);
        };
    }, []);


    const onPress = (review_id) => {
        setPressedId(review_id);
        setVisible(true);
    };

    const getMyReviews = useCallback(async () => {
        const result = await API.get(`/review?user_id=${user_id}`);
        if (result) setReviews(result);
    }, [reviews]);

    const deleteReview = async () => {
        const res = await API.patch(`/review/${pressedId}/delete`);
        SimpleToast.show(res.message, SimpleToast.SHORT);
        getMyReviews();
    };

    const myReviewList = ({ item }) => (
        <Review key={item.review_id}>
            <TopWrapper>
                <LeftWrapper>
                    <CafeName>{item.cafe_name}</CafeName>
                    <MiddleWrapper>
                        <StarWrapper>
                            <StarRating
                                disabled={true}
                                maxStars={5}
                                starSize={13}
                                fullStarColor={"#FF8E26"}
                                emptyStarColor={"#FF8E26"}
                                rating={item.star} />
                        </StarWrapper>
                        <Date>{item.created_at.substring(0, 10)}</Date>
                    </MiddleWrapper>
                </LeftWrapper>
                <DeleteButton onPress={() => onPress(item.review_id)}>삭제</DeleteButton>
            </TopWrapper>
            <Content>{item.content}</Content>
            {item.image ? <Photo source={{ uri: item.image }} /> : <></>}
        </Review>
    );

    return (
        <Wrapper>
            <List
                data={reviews}
                renderItem={myReviewList}
                numColumns={1}
                keyExtractor={(review) => review.review_id}
            />

            <Provider>
                <Modal
                    transparent={true}
                    onClose={() => setVisible(false)}
                    maskClosable
                    visible={visible}
                    closable
                    footer={footerButtons}
                >
                    <View style={{ paddingVertical: 20 }}>
                        <Text />
                        <Text style={{ textAlign: 'center', fontSize: 20 }}>삭제할까요?</Text>
                    </View>
                </Modal>
            </Provider>
        </Wrapper>
    );
};


const Review = styled.View`
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
`;

const CafeName = styled.Text`
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

const List = styled.FlatList`
    margin: 2px;  
`;

const Wrapper = styled.View`
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    padding: 3%;
`;

export default MyReviewScreen;