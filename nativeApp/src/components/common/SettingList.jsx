import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';

const SettingList = ({ title, onPress }) => {
    return (
        <List onPress={onPress} activeOpacity={1}>
            <Title>{title}</Title>
            <Arrow>
                <Icon name="right" size={16} />
            </Arrow>
        </List>
    );
};

const List = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #ffffff;
  padding: 15px;
  padding-left: 20px;
`;

const Title = styled.Text`
  font-size: 15px;
  width: 95%;
  font-weight: bold;
`;

const Arrow = styled.View`
  right: 0;
  padding-top: 2px;
`;

export default SettingList;
