import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

const Info = ({ id, name, addr, star, review, onPress }) => {
    return (
        <Wrapper onPress={onPress} activeOpacity={1} key={id}>
            <StyledView>
                <Name>{name}</Name>
                <ValueView>
                    <Icon name="star" color="red" size={30} />
                    <Value>&nbsp;{star}</Value>
                    <Text>&nbsp;&nbsp;</Text>
                    <Icon name="pencil" size={30} />
                    <Value>{review}</Value>
                </ValueView>
            </StyledView>
            <Addr>{addr}</Addr>
        </Wrapper>
    )
}

const Wrapper = styled.TouchableOpacity`
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    width: 87%;
    height: 18%;
    background-color: #ffffff;
    margin: 2.5%;
    padding: 3%;
    shadow-color: #000000;
    shadow-offset: { width: 0; height: 1 };
    shadow-opacity: 0.8;
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
    width: 60%;
`;

const ValueView = styled.View`
    flex-grow: 1;
    flex-direction: row;
    text-align: right;
`;

const Value = styled.Text`
    font-size: 17px;
`;

const Addr = styled.Text`
    padding-top: 5px;
    font-size: 15px;
`;


export default Info;