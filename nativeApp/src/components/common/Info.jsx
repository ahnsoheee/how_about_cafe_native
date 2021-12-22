import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';
import Star from './Star';
import Pencil from './Pencil';

const Info = ({ user_id, cafe_id, cafe_name, addr_road, star, review, navigation }) => {
    const onPress = () => {
        // 상세 정보 로직
        navigation.navigate('Detail', {
            user_id: user_id,
            cafe_id: cafe_id,
            cafe_name: cafe_name,
            addr_road: addr_road,
            star: star,
            review: review
        });
    };

    return (
        <Wrapper onPress={onPress} activeOpacity={1} key={cafe_id}>
            <StyledView>
                <Name>{cafe_name}</Name>
                <ValueView>
                    <Star star={star} />
                    <Text>&nbsp;&nbsp;</Text>
                    <Pencil review={review} />
                </ValueView>
            </StyledView>
            <Addr>{addr_road}</Addr>
        </Wrapper>
    );
};

const Wrapper = styled.TouchableOpacity`
    height: 95px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    overflow: visible;
    background-color: #ffffff;
    margin-bottom: 20px;
    padding: 3%;
    box-shadow: 5px 5px 5px #dddddd;
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
