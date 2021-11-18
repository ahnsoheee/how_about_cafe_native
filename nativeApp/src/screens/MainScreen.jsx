import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import InitScreen from './InitScreen';
import HomeScreen from './HomeScreen';
import SettingScreen from './SettingScreen'
import HomeIcon from '../components/common/Icon/HomeIcon';
import SettingIcon from '../components/common/Icon/SettingIcon';
const Tab = createBottomTabNavigator();

const MainScreen = ({ navigation }) => {
    const [auth, setAuth] = useState(true);

    return auth ? (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false
            }}>
            <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ focused }) => <HomeIcon focused={focused} /> }} />
            <Tab.Screen name="Settings" component={SettingScreen} options={{ tabBarIcon: ({ focused }) => <SettingIcon focused={focused} /> }} />
        </Tab.Navigator>
    ) : (
        <InitScreen navigation={navigation} />
    )
}

export default MainScreen;