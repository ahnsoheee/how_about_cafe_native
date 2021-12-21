import React from 'react';
import styled from 'styled-components/native';

const MorePhoto = ({ uri, cnt, cafe_name, navigation, photos }) => {
    return (
        <Wrapper onPress={() => navigation.navigate('Image', { cafe_name: cafe_name, photos: photos })}>
            <StyldImage
                source={{ uri: uri }}
                resizeMode="cover"
                imageStyle={{ opacity: 0.5 }}>
                <Number>
                    {'\n+'}
                    {cnt}
                </Number>
            </StyldImage>
        </Wrapper>
    );
};

const Wrapper = styled.TouchableOpacity`
    width: 25%;
    margin: 2px;
`;

const StyldImage = styled.ImageBackground`
    width: 100%;
    height: 90px;
`;

const Number = styled.Text`
    color: #ffffff;
    font-weight: bold;
    font-size: 24px;
    text-align: center;
    align-items: center;
`;

export default MorePhoto;
