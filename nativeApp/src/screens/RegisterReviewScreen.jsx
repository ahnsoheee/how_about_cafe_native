import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import StarRating from 'react-native-star-rating';
import Button from '../components/common/Button';
import * as ImagePicker from "react-native-image-picker";
import { Modal } from '@ant-design/react-native';
import Image from "../components/common/Image";
import SimpleToast from 'react-native-simple-toast';
import { API } from "../api/api";

const RegisterReviewScreen = ({ navigation, route }) => {
    const [starCount, setStarCount] = useState(0);
    const [text, onChangeText] = useState('');
    const { user_id, cafe_id, review_id, star, content, image } = route.params;
    const [imageSrc, setImageSrc] = useState('');
    //const [imageSrc, setImageSrc] = useState([]);
    //const [num, setNum] = useState(0);

    useEffect(() => {
        if (review_id) {
            setStarCount(star);
            onChangeText(content);
            setImageSrc(image);
        }
    }, []);

    const footerButtons = [
        { text: '취소' },
        { text: '삭제', onPress: () => setImageSrc('') },
    ];

    //const footerButtons = [
    //    { text: '취소' },
    //    { text: '삭제', onPress: () => setImageSrc(imageSrc.filter((image, index) => index != num - 1)) },
    //];

    const registerReview = async () => {
        let res = '';
        if (review_id) {
            res = await API.patch(`/review/edit`, {
                "review_id": review_id,
                "star": starCount,
                "content": text,
                "image": imageSrc
            });

        } else {
            if (starCount == 0) {
                SimpleToast.show('별점을 선택해 주세요', SimpleToast.SHORT);
            } else if (!text) {
                SimpleToast.show('리뷰를 작성해 주세요', SimpleToast.SHORT);
            } else if (text.length < 5) {
                SimpleToast.show('리뷰는 5자 이상 작성해 주세요', SimpleToast.SHORT);
            } else {
                res = await API.post('/review', {
                    "cafe_id": cafe_id,
                    "user_id": user_id,
                    "star": starCount,
                    "content": text,
                    "image": imageSrc
                });
            }
        };

        SimpleToast.show(res.meessage, SimpleToast.SHORT);
        if (res.status == 200) {
            navigation.goBack();
        }
    };

    const onPressImage = () => {
        if (imageSrc.length) setVisible(true);
        else onSelectImage();
    };

    //const onPressImage = (key) => {
    //    if (key) setVisible(true);
    //    else onSelectImage();
    //};

    const onSelectImage = () => {
        Modal.operation([
            { text: '사진 보관함', onPress: () => onSelectGallery() },
            { text: '카메라', onPress: () => onSelectCamera() },
            { text: '취소' }
        ]);
    };

    const onSelectGallery = () => {
        ImagePicker.launchImageLibrary({}, (response) => {
            if (!response.didCancel) setImageSrc(response.assets[0].uri.replace("file:", ""));
            //setImageSrc([...imageSrc, response.assets[0].uri.replace("file:", "")]);
        });
    };

    const onSelectCamera = () => {
        ImagePicker.launchCamera({
            saveToPhotos: true,
            mediaType: 'photo',
            includeBase64: false
        }, (response) => {
            setImageSrc(response.assets[0].uri);
            //setImageSrc([...imageSrc, response.assets[0].uri]);
        });
    };

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
            {/*<ImageList imageSrc={imageSrc} onPressImage={onPressImage} setNum={setNum} />*/}
            <Image onPressImage={onPressImage} imageSrc={imageSrc} />
            <Button name="저장하기" onPress={registerReview} />
        </Wrapper>
    );
};

const Wrapper = styled.View`
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    padding: 30px 15px;
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
    font-size: 18px;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    overflow: hidden;
    padding: 10px;
    text-align-vertical: top;
`;

export default RegisterReviewScreen;