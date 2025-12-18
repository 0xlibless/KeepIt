import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../screens/HomeScreen';
import OnBoard from '../screens/OnBoard';
import TrashScreen from '../screens/TrashScreen';
import Update from '../utils/CheckUpdate';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value === null) {
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  }

  return (
    <NavigationContainer>
      <Update />
      <Stack.Navigator initialRouteName={isFirstLaunch ? "OnBoard" : "KeepIt"}>
        <Stack.Screen name="OnBoard" component={OnBoard} options={{ headerShown: false }} />
        <Stack.Screen name="KeepIt" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Trash" component={TrashScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
