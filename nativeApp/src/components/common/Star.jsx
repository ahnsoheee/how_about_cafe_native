import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/EvilIcons';

const Star = ({ star }) => {
    return (
        <>
            <Icon name="star" color="red" size={30} />
            <Value>&nbsp;{star}</Value>
        </>
    )
}


const Value = styled.Text`
    font-size: 17px;
`;

export default Star;