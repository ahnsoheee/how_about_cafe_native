import React from 'react';
import styled from 'styled-components';

const MorePhoto = ({ uri, cnt }) => {
    return (
        <StyldImage
            source={{ uri: uri }}
            resizeMode="cover"
            imageStyle={{ opacity: 0.5 }}>
            <Number>
                {'\n+'}
                {cnt}
            </Number>
        </StyldImage>
    );
};

const StyldImage = styled.ImageBackground`
  width: 25%;
  height: 90px;
  margin: 2px;
`;

const Number = styled.Text`
  color: #ffffff;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  align-items: center;
`;

export default MorePhoto;
