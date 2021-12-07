import React from 'react';
import Photo from './Photo';
import MorePhoto from './MorePhoto';

const PhotoList = ({ photos }) => {
    if (photos.length >= 4) {
        return (
            <>
                <Photo key={photos[0].id} uri={photos[0].path} />
                <Photo key={photos[1].id} uri={photos[1].path} />
                <Photo key={photos[2].id} uri={photos[2].path} />
                <MorePhoto
                    key={photos[3].id}
                    uri={photos[3].path}
                    cnt={photos.length - 3}
                />
            </>
        );
    } else {
        const photoList = photos.map(photo => {
            return <Photo key={photo.id} uri={photo.path} />;
        });
        return <>{photoList}</>;
    }
};

export default PhotoList;
