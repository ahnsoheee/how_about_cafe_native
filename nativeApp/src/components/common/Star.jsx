import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Entypo';

const Star = ({ star }) => {
    return (
        <Wrapper>
            <Icon name="star" color="#FF8E26" size={20} />
            <Value>&nbsp;{star}</Value>
        </Wrapper>
    );
};

const Wrapper = styled.View`
    flex-direction: row;
`;

const Value = styled.Text`
    font-size: 17px;
    width: 40px;
`;

export default Star;