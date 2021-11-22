import React, { useState } from 'react';
import styled from 'styled-components'
import StarRating from 'react-native-star-rating';
import Button from '../components/common/Button';
import Icon from 'react-native-vector-icons/Entypo'

const ReviewScreen = ({ navigation, route }) => {
    const [starCount, setStarCount] = useState(0)
    const [text, onChangeText] = React.useState('')


    const onPress = () => {
        // 리뷰 저장 로직

        // cafe_id: route.params.id
        navigation.goBack();
    }

    const onPressCamera = () => {

    }

    return (
        <Wrapper>
            <Text>만족하셨나요 ?</Text>
            <StarWrapper>
                <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={starCount}
                    selectedStar={(rating) => setStarCount(rating)}
                    fullStarColor={"#FF8E26"}
                    emptyStarColor={"#FF8E26"}
                />
            </StarWrapper>
            <Input placeholder="리뷰는 솔직하게 작성해주세요." onChangeText={onChangeText} value={text} editable maxLength={400} multiline={true} />
            <CameraWrapper>
                <Camera onPress={onPressCamera}>
                    <Icon name="camera" size={40} />
                </Camera>
            </CameraWrapper>
            <Button name="저장하기" onPress={onPress} />
        </Wrapper>
    )
}

const Wrapper = styled.View`
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    padding: 30px 20px;
    align-items: center;
`;

const Text = styled.Text`
    width: 100%;
    font-size: 23px;
    text-align: center;
    font-weight: bold;
`;

const StarWrapper = styled.View`
    width: 50%;
    padding: 30px 0;
`;

const Input = styled.TextInput`
    width: 100%;
    height: 45%;
    font-size: 20px;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    padding: 10px;
    text-align-vertical: top;

`;

const CameraWrapper = styled.View`
    width: 100%;
    margin-top: 20px;
`;

const Camera = styled.View`
    width: 70px;
    height: 70px;
    background-color: #eeeeee;
    justify-content: center;
    align-items: center;
`;


export default ReviewScreen;