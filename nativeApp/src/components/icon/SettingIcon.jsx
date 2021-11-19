import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

const SettingIcon = ({ focused }) => {
    return (
        <Icon name="setting" size={20} color={focused ? "#FF8E26" : "#000000"} />
    )
}

export default SettingIcon;