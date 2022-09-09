import React from 'react';
import SearchScreen from '../screens/SearchScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsContainer from './SettingsContainer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IconHome from 'react-native-vector-icons/Octicons';
import IconSearch from 'react-native-vector-icons/Fontisto';
import IconSettings from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'pink',
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({size}) => (
            <IconHome name="home" color={'black'} size={size} />
          ),
        }}
        name={'HomeScreen'}
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({size}) => (
            <IconSearch name="search" color={'black'} size={size} />
          ),
          tabBarLabel: 'Search',
        }}
        name={'SearchScreen'}
        component={SearchScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({size}) => (
            <IconSettings name="settings" color={'black'} size={size} />
          ),
        }}
        name={'SettingsContainer'}
        component={SettingsContainer}
      />
    </Tab.Navigator>
  );
}
