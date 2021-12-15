import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InitScreen from './InitScreen';
import HomeScreen from './HomeScreen';
import SettingScreen from './SettingScreen';
import HomeIcon from '../components/icon/HomeIcon';
import SettingIcon from '../components/icon/SettingIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../api/api';

const Tab = createBottomTabNavigator();

const MainScreen = ({ navigation }) => {
    const [auth, setAuth] = useState(false);
    const [user_name, setUserName] = useState('');
    const [home, setHome] = useState(true);
    const [setting, setSetting] = useState(false);
    const [search, setSearch] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {

        const getAuth = async (token) => {
            const res = await API.post("/auth", token);
            setUserName(res.result);
            setAuth(res.status);
        };

        AsyncStorage.getItem("token").then((token) => {
            if (token) {
                getAuth(token);
            }
        });
    }, [auth, user_name]);

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
                {() => <SettingScreen
                    user_name={user_name}
                    navigation={navigation} />}
            </Tab.Screen>
        </Tab.Navigator>
    ) : (
        <InitScreen navigation={navigation} />
    );
};

export default MainScreen;