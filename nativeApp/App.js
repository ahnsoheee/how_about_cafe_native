import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './src/screens/MainScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';

const Stack = createNativeStackNavigator();

class App extends React.Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#ffffff' },
          }}>
          <Stack.Screen name="Main" component={MainScreen} options={{ title: '카페어때', headerShown: false }} />
          <Stack.Screen name="Signin" component={SigninScreen} options={{ title: '로그인' }} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{ title: '회원가입' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

}

export default App;