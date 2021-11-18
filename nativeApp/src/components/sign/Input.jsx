import React from 'react';
import { InputItem } from '@ant-design/react-native'
import styled from 'styled-components/native';

const Input = ({ type, placeholder, value, onChange }) => {
    return <StyledInput type={type} placeholder={placeholder} value={value} onChange={onChange} />
}

const StyledInput = styled(InputItem)`
    height: 50px;
    font-size: 15px;
`;

export default Input;