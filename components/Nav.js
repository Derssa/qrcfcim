import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Auth from './pages/Auth';
import Index from './pages/Index';
import Scan from './pages/Scan';
import Success from './pages/Success';
import Fail from './pages/Fail';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from './utils/Loading';
import Notsub from './pages/Notsub';

const Stack = createStackNavigator();

const Nav = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState('');

  useEffect(() => {
    const getLogin = async () => {
      const firstLogin = await AsyncStorage.getItem('firstLogin');
      if (JSON.parse(firstLogin)) {
        try {
          const res = await axios.post(
            `http://192.168.8.70:5000/api/user/refresh_token`,
            null,
          );
          setToken(res.data.access_token);
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          await AsyncStorage.removeItem('firstLogin');
          await AsyncStorage.removeItem('user');
        }
      } else {
        setIsLoading(false);
      }
    };
    getLogin();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#0c4377" barStyle="light-content" />
      {isLoading ? (
        <Loading />
      ) : (
        <Stack.Navigator initialRouteName={token != '' ? 'Index' : 'Auth'}>
          <Stack.Screen
            options={{headerShown: false}}
            name="Auth"
            component={Auth}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Index"
            component={Index}
            initialParams={{token}}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Scan"
            component={Scan}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Success"
            component={Success}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Notsub"
            component={Notsub}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Fail"
            component={Fail}
          />
        </Stack.Navigator>
      )}
    </>
  );
};

export default Nav;
