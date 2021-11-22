import React from 'react'
import styled from 'styled-components/native';

const Photo = ({ uri }) => {
    return <StyldImage source={{
        uri: uri
    }} />
}

const StyldImage = styled.Image`
    width: 90px;
    height: 90px;
    border-radius: 0;
    margin: 1px;
`;

export default Photo;
