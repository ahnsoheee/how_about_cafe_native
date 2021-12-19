import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InitScreen from './InitScreen';
import HomeScreen from './HomeScreen';
import SettingScreen from './SettingScreen';
import HomeIcon from '../components/icon/HomeIcon';
import SettingIcon from '../components/icon/SettingIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../api/api';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const Tab = createBottomTabNavigator();

const MainScreen = ({ navigation }) => {
    const [auth, setAuth] = useState(false);
    const [token, setToken] = useState(null);
    const [user_name, setUserName] = useState('');
    const [home, setHome] = useState(true);
    const [setting, setSetting] = useState(false);
    const [search, setSearch] = useState(false);
    const [searchValue, setSearchValue] = useState('');


    useFocusEffect(
        useCallback(() => {
            const getToken = async () => {
                const token = await AsyncStorage.getItem("token");
                setToken(token);
            };

            const getAuth = async () => {
                const res = await API.post("/user/auth", token);
                if (res.status) {
                    setUserName(res.result);
                    setAuth(true);
                }
            };
            getToken();
            if (token) getAuth();
            else {
                setUserName('');
                setAuth(false);
            }
        }, [token, auth, user_name])
    );

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
                    navigation={navigation}
                    user_name={user_name} />}
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
                    setAuth={setAuth}
                    user_name={user_name}
                    navigation={navigation} />}
            </Tab.Screen>
        </Tab.Navigator>
    ) : (
        <InitScreen navigation={navigation} />
    );
};

export default MainScreen;