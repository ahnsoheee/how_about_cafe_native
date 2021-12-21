import React from 'react';
import Info from './Info';

const InfoList = ({ user_id, infos, navigation }) => {
    if (infos) {
        const infoList = infos.map(info => {
            return (
                <Info
                    user_id={user_id}
                    key={info.cafe_id}
                    cafe_id={info.cafe_id}
                    cafe_name={info.cafe_name}
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
