import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/EvilIcons';

const Pencil = ({ review }) => {
    return (
        <>
            <Icon name="pencil" size={30} />
            <Value>{review}</Value>
        </>
    )
}


const Value = styled.Text`
    font-size: 17px;
`;

export default Pencil;