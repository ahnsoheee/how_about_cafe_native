import React from 'react';
import styled from 'styled-components/native';

const Photo = ({ uri }) => {
    return (
        <StyldImage
            source={{
                uri: uri,
            }}
        />
    );
};

const StyldImage = styled.Image`
  width: 24%;
  height: 90px;
  border-radius: 0;
  margin: 2px;
`;

export default Photo;
