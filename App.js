import { StatusBar } from 'expo-status-bar';
import {  Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import Settings from './screens/Settings';
import PlaceList from './screens/PlaceList';
import PlaceMap from './screens/PlaceMap';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Places Map') {
            iconName = focused
              ? 'layers'
              : 'layers-outline';
          } 
          else if (route.name === 'Places List') {
            iconName = focused ? 'clipboard-text' : 'clipboard-text-outline';
          }
          else if (route.name === 'Settings') {
            iconName = focused ? 'cog' : 'cog-outline';
          }

          // You can return any component that you like here!
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'lightgreen',
        tabBarInactiveTintColor: 'darkgreen',
      })}
    >
  <Tab.Screen name="Places Map" component={PlaceMap} />
  <Tab.Screen name="Places List" component={PlaceList} />
  <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  </NavigationContainer>

  );
}
