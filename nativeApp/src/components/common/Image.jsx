import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Entypo';

const Image = ({ imageSrc, onPressImage }) => {

    return (
        <PhotoList>
            <Wrapper onPress={() => onPressImage()}>
                {imageSrc ? (
                    <Photo source={{ uri: imageSrc }} />
                ) : (
                    <Camera>
                        <Icon name="camera" size={40} />
                    </Camera>
                )}
            </Wrapper>
        </PhotoList>
    );
};

const PhotoList = styled.View`
  width: 100%;
  flex-direction: row;
  margin-top: 20px;
`;

const Wrapper = styled.TouchableOpacity`
  width: 20%;
  height: 70px;
  padding: 0 1%;
`;

const Photo = styled.Image`
  width: 100%;
  height: 100%;
`;

const Camera = styled.View`
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
  justify-content: center;
  align-items: center;
`;

export default Image;