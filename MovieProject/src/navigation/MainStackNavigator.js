import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import {useSelector, useDispatch} from 'react-redux';
import SignupScreen from '../screens/SignupScreen';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import {setUser} from '../redux/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTabNavigator from './BottomTabNavigator';
const Stack = createNativeStackNavigator();
const MainStackNavigator = () => {
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem('user').then(val => {
      console.log("MainStackNavigation AsyncStorage'dan çekildi:", val);
      dispatch(setUser(val));
      console.log("MainStackNavigation Redux'a atandı user:", val);
    });
  }, [dispatch]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <React.Fragment>
        {!user ? (
          <React.Fragment>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Stack.Screen
              name="BottomTabNavigator"
              component={BottomTabNavigator}
            />
            <Stack.Screen
              name="MovieDetailScreen"
              component={MovieDetailScreen}
            />
          </React.Fragment>
        )}
      </React.Fragment>
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
