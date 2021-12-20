import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './src/screens/MainScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import DetailScreen from './src/screens/DetailScreen';
import RegisterReviewScreen from './src/screens/RegisterReviewScreen';
import RegisterCafeScreen from './src/screens/RegisterCafeScreen';
import DeleteUserScreen from './src/screens/DeleteUserScreen';
import EditUserInfo from './src/screens/EditUserInfo';
import PostScreen from "./src/screens/PostScreen";
import MyReviewScreen from "./src/screens/MyReviewScreen";
import SearchCafeScreen from "./src/screens/SearchCafeScreen";

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
                    <Stack.Screen name="Detail" component={DetailScreen} options={({ route }) => ({ title: route.params.name, headerShown: false })} />
                    <Stack.Screen name="RegisterReview" component={RegisterReviewScreen} options={{ title: '리뷰 등록' }} />
                    <Stack.Screen name="RegisterCafe" component={RegisterCafeScreen} options={{ title: '카페 등록' }} />
                    <Stack.Screen name="EditUserInfo" component={EditUserInfo} options={{ title: '회원정보 수정' }} />
                    <Stack.Screen name="DeleteUser" component={DeleteUserScreen} options={{ title: '회원 탈퇴' }} />
                    <Stack.Screen name="Post" component={PostScreen} options={{ title: '주소 검색' }} />
                    <Stack.Screen name="MyReview" component={MyReviewScreen} options={{ title: '내가 쓴 리뷰' }} />
                    <Stack.Screen name="SearchCafe" component={SearchCafeScreen} options={{ title: "검색", headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

}

export default App;