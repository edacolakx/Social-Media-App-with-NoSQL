import { View, Text, Button,ActivityIndicator } from 'react-native';
import React, { useEffect, useState ,useContext} from 'react';
import neo4j from 'neo4j-driver';
import axios from 'axios';
import Createuser from './pages/createuser';
import Login from './pages/login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './context/Authcontext';
import HomePage from './pages/homepage';
import Profile from './pages/profile';

const Tab=createBottomTabNavigator()
const Stack=createNativeStackNavigator()
const Home = () => {

  
  return (
   

    <Tab.Navigator>
      <Tab.Screen name='Kaydol' component={Createuser} options={{tabBarActiveBackgroundColor:"#9FBB73"}}></Tab.Screen>
      <Tab.Screen name='Giris' component={Login} options={{tabBarActiveBackgroundColor:"#9FBB73"}}></Tab.Screen>
      <Tab.Screen name='Anasayfa' component={HomePage} options={{tabBarActiveBackgroundColor:"#9FBB73"}}></Tab.Screen>
      <Tab.Screen name='Profil' component={Profile} options={{tabBarActiveBackgroundColor:"#9FBB73"}}></Tab.Screen>
    </Tab.Navigator>

   
  );
};

const App=()=>{
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home}></Stack.Screen>
        <Stack.Screen name='HomePage' component={HomePage}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
