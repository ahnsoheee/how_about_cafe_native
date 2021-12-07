import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

const HomeIcon = ({ focused }) => {
    return (
        <Icon name="home" size={20} color={focused ? "#FF8E26" : "#000000"} />
    );
};

export default HomeIcon;