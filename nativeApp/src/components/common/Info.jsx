import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';
import Star from './Star';
import Pencil from './Pencil';

const Info = ({ id, name, addr, star, review, navigation }) => {

    const onPress = () => {
        // 상세 정보 로직
        navigation.navigate('Detail', {
            id: id,
            name: name,
            addr: addr,
            star: star,
            review: review
        })
    }

    return (
        <Wrapper onPress={onPress} activeOpacity={1} key={id}>
            <StyledView>
                <Name>{name}</Name>
                <ValueView>
                    <Star star={star} />
                    <Text>&nbsp;&nbsp;</Text>
                    <Pencil review={review} />
                </ValueView>
            </StyledView>
            <Addr>{addr}</Addr>
        </Wrapper>
    )
}

const Wrapper = styled.TouchableOpacity`
    height: 95px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    background-color: #ffffff;
    margin-bottom: 20px;
    padding: 3%;
    shadow-color: #000000;
    shadow-opacity: 0.1;
    shadow-radius: 10px;
    elevation: 3;
`;

const StyledView = styled.View`
    flex-direction: row;
    height: 40%;
`;

const Name = styled.Text`
    font-weight: bold;
    font-size: 18px;
    width: 65%;
`;

const ValueView = styled.View`
    flex-grow: 1;
    flex-direction: row;
    text-align: right;
`;

const Addr = styled.Text`
    padding-top: 5px;
    font-size: 15px;
`;


export default Info;