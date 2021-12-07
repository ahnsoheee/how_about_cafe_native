import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const SettingIcon = ({ focused }) => {
    return (
        <Icon name="ios-settings" size={20} color={focused ? "#FF8E26" : "#000000"} />
    );
};

export default SettingIcon;