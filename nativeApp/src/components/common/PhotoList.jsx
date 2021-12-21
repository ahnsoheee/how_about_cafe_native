import React from 'react';
import Photo from './Photo';
import MorePhoto from './MorePhoto';
import styled from "styled-components/native";

const PhotoList = ({ photos, cafe_name, navigation }) => {
    if (photos.length >= 4) {
        return (
            <>
                <Photo key={photos[0].review_id} uri={photos[0].image} />
                <Photo key={photos[1].review_id} uri={photos[1].image} />
                <Photo key={photos[2].review_id} uri={photos[2].image} />
                <MorePhoto
                    key={photos[3].review_id}
                    uri={photos[3].image}
                    cnt={photos.length - 3}
                    cafe_name={cafe_name}
                    navigation={navigation}
                    photos={photos}
                />
            </>
        );
    } else {
        const photoList = [];
        for (let i = 0; i < 4; i++) {
            if (photos[i]) photoList.push(<Photo key={photos[i].review_id} uri={photos[i].image} />);
            else { photoList.push(<Nothing />); }
        }

        return <>{photoList}</>;
    }
};

const Nothing = styled.View`
    width: 24%;
    height: 90px;
    margin: 2px;
    background-color: #ffffff;
`;


export default PhotoList;
