import React from 'react';
import Info from './Info';

const InfoList = ({ infos, navigation }) => {
    if (infos) {
        const infoList = infos.map(info => {
            return (
                <Info
                    key={info.cafe_id}
                    id={info.cafe_id}
                    name={info.cafe_name}
                    addr={info.addr}
                    star={info.star}
                    review={info.review}
                    navigation={navigation}
                />
            );
        });
        return <>{infoList}</>;
    }
    return <></>;
};

export default InfoList;
