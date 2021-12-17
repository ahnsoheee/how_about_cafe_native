import React, { useState } from 'react';
import styled from 'styled-components/native';
import Postcode from '@actbase/react-daum-postcode';

const PostScreen = ({ navigation, route }) => {
    const setAddr = route.params.setAddr;
    const setPostcode = route.params.setPostcode;

    return (
        <Post
            jsOptions={{ animated: false, hideMapBtn: true }}
            onSelected={(data) => {
                setPostcode(data.zonecode);
                if (data.userSelectedType === 'R') {
                    // 도로명 주소 선택
                    setAddr(data.roadAddress);
                } else {
                    // 지번 주소 선택
                    setAddr(data.jibunAddress);
                }
                navigation.goBack();
            }}
        />
    );
};

const Post = styled(Postcode)`
    width: 100%; 
    height: 100%;
`;

export default PostScreen;