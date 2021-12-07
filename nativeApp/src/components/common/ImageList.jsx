import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Entypo';

const ImageList = ({ imageSrc, onPressCamera, setNum }) => {
    const onPress = index => {
        onPressCamera(index);
        setNum(index);
    };

    const imageList = imageSrc.map((image, index) => {
        return (
            <Wrapper key={image} onPress={() => onPress(index + 1)}>
                <Photo source={{ uri: image }} />
            </Wrapper>
        );
    });

    return (
        <PhotoList>
            {imageList}
            {imageSrc.length == 5 ? (
                <></>
            ) : (
                <Wrapper onPress={() => onPress()}>
                    <Camera>
                        <Icon name="camera" size={40} />
                    </Camera>
                </Wrapper>
            )}
        </PhotoList>
    );
};

const PhotoList = styled.View`
  width: 100%;
  flex-direction: row;
  margin-top: 20px;
`;

const Wrapper = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  margin: 0 1%;
`;

const Photo = styled.Image`
  width: 70px;
  height: 70px;
`;

const Camera = styled.View`
  width: 70px;
  height: 70px;
  background-color: #eeeeee;
  justify-content: center;
  align-items: center;
`;
export default ImageList;
