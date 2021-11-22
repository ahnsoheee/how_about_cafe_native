import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import InitScreen from './InitScreen';
import HomeScreen from './HomeScreen';
import SettingScreen from './SettingScreen'
import HomeIcon from '../components/icon/HomeIcon';
import SettingIcon from '../components/icon/SettingIcon';

const Tab = createBottomTabNavigator();

const MainScreen = ({ navigation }) => {
    const [auth, setAuth] = useState(true);
    const [user_id, setUserId] = useState('');
    const [home, setHome] = useState(true);
    const [setting, setSetting] = useState(false);
    const [search, setSearch] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    return auth ? (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false
            }}>
            <Tab.Screen
                name="Home"
                options={{ tabBarIcon: ({ focused }) => <HomeIcon focused={focused} /> }}
                listeners={{
                    tabPress: (e) => {
                        setHome(true);
                        setSetting(false);
                        setSearchValue('');
                        setSearch(false);
                    }
                }}
            >
                {() => <HomeScreen
                    search={search}
                    setSearch={setSearch}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    navigation={navigation} />}
            </Tab.Screen>
            <Tab.Screen
                name="Settings"
                options={{ tabBarIcon: ({ focused }) => <SettingIcon focused={focused} /> }}
                listeners={{
                    tabPress: (e) => {
                        setHome(false);
                        setSetting(true);
                        setSearchValue('');
                        setSearch(false);
                    }
                }}
            >
                {() => <SettingScreen user_id={user_id} />}
            </Tab.Screen>
        </Tab.Navigator>
    ) : (
        <InitScreen navigation={navigation} />
    )
}

export default MainScreen;