import React from 'react';
import styled from 'styled-components/native';
import Postcode from '@actbase/react-daum-postcode';
import { LogBox } from "react-native";
const PostScreen = ({ navigation, route }) => {
    const setSelectAddr = route.params.setSelectAddr;
    const setAddr_road = route.params.setAddr_road;
    const setAddr_jibun = route.params.setAddr_jibun;
    const setPostcode = route.params.setPostcode;
    LogBox.ignoreAllLogs();
    return (
        <Post
            jsOptions={{ animated: false, hideMapBtn: true }}
            onSelected={(data) => {
                setPostcode(data.zonecode);
                if (data.userSelectedType === 'R') {
                    // 도로명 주소 선택
                    setSelectAddr(data.roadAddress);
                } else {
                    // 지번 주소 선택
                    setSelectAddr(data.jibunAddress);
                }
                setAddr_road(data.roadAddress);
                setAddr_jibun(data.jibunAddress);
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