import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Modal } from 'react-native';

const ImageScreen = ({ route }) => {
    const photos = route.params.photos;
    const [visible, setVisible] = useState(false);
    const [pressedImage, setPressedImage] = useState('');

    const onPress = (uri) => {
        setPressedImage(uri);
        setVisible(true);
    };

    const photoList = ({ item }) => (
        <>
            <Photo
                key={item.review_id}
                onPress={() => onPress(item.image)}>
                <Image
                    key={item.review_id}
                    source={{ uri: item.image }}
                />
            </Photo>
            <Modal
                visible={visible}>
                <Wrapper onPress={() => setVisible(false)}>
                    <LargeImage
                        source={{ uri: pressedImage }}
                    />
                </Wrapper>
            </Modal>
        </>
    );

    return (
        <>
            <List
                data={photos}
                renderItem={photoList}
                numColumns={3}
                keyExtractor={(photo) => photo.review_id} />
        </>
    );
};

const List = styled.FlatList`
    margin: 2px;  
`;

const Photo = styled.TouchableOpacity`
    margin: 2px;
    width: 32.3%;
`;

const Image = styled.ImageBackground`
    width: 100%;
    height: 125px;
`;

const Wrapper = styled.TouchableOpacity`
    overflow: hidden;
    width: 100%;
    height: 100%;
    justify-content: center;
    background-color: #000000;
`;

const LargeImage = styled.Image`
    resize-mode: contain
    width: 100%;
    height: 60%;
`;

export default ImageScreen;