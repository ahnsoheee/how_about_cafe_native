import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ToastAndroid, Platform } from 'react-native';
import SimpleToast from 'react-native-simple-toast';
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
    const [user_id, setUserId] = useState('');
    const [user_name, setUserName] = useState('');
    const [home, setHome] = useState(true);
    const [setting, setSetting] = useState(false);

    useFocusEffect(
        useCallback(() => {
            const getToken = async () => {
                const token = await AsyncStorage.getItem("token");
                setToken(token);
            };

            const getAuth = async () => {
                const res = await API.post("/user/auth", token);
                if (res.status > 200) {
                    if (Platform.OS === 'android') {
                        ToastAndroid.show(res.message, ToastAndroid.SHORT, ToastAndroid.CENTER);
                    } else {
                        SimpleToast.show(res.message, SimpleToast.SHORT);
                    }
                    setAuth(false);
                }
                else {
                    setUserId(res.user_id);
                    setUserName(res.user_name);
                    setAuth(true);
                }
            };
            getToken();
            if (token) getAuth();
            else {
                setUserId('');
                setUserName('');
                setAuth(false);
            }
        }, [token, auth, user_id, user_name])
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
                    }
                }}
            >
                {() => <HomeScreen
                    navigation={navigation}
                    user_id={user_id} />}
            </Tab.Screen>
            <Tab.Screen
                name="Settings"
                options={{ tabBarIcon: ({ focused }) => <SettingIcon focused={focused} /> }}
                listeners={{
                    tabPress: (e) => {
                        setHome(false);
                        setSetting(true);
                    }
                }}
            >
                {() => <SettingScreen
                    setAuth={setAuth}
                    navigation={navigation}
                    user_name={user_name}
                    user_id={user_id}
                    setUserName={setUserName} />}
            </Tab.Screen>
        </Tab.Navigator>
    ) : (
        <InitScreen navigation={navigation} />
    );
};

export default MainScreen;