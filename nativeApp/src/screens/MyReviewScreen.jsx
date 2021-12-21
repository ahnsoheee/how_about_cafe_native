import React from 'react';
import { useState, useCallback } from 'react';
import styled from 'styled-components/native';
import { API } from '../api/api';
import MyReviewList from '../components/common/MyReviewList';
import { View, Text } from 'react-native';
import { Modal, Provider } from '@ant-design/react-native';
import SimpleToast from "react-native-simple-toast";
import { useEffect } from "react";

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
    }, []);


    const getMyReviews = useCallback(async () => {
        const result = await API.get(`/review?user_id=${user_id}`);
        if (result) setReviews(result);
        getMyReviews();
    }, []);

    const deleteReview = async () => {
        const res = await API.patch(`/review/${pressedId}/delete`);
        SimpleToast.show(res.result, SimpleToast.SHORT);
        pressedId(0);
        getMyReviews();
    };

    return (
        <Wrapper>
            <MyReviewList reviews={reviews} setVisible={setVisible} setPressedId={setPressedId} />
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

const Wrapper = styled.View`
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    padding: 3%;
`;

export default MyReviewScreen;