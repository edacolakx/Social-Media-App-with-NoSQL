import 'react-native-gesture-handler';
import {  Button } from 'react-native';
import React from 'react';
import Login from './pages/login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from './pages/homepage';
import Profile from './pages/profile';
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import genelResponseReducer from './redux';
import { useDispatch,useSelector } from 'react-redux'
import Search from './pages/search';
import Notification from './pages/notification';
import Message from './pages/message';
import Profileupdate from './pages/profileupdate';
import Otheruserprofile from './pages/otheruserprofile';
import Singlepost from './pages/singlepost';
import Showfollowers from './pages/showfollowers';
import Updatepost from './pages/updatepost';
import Icon from 'react-native-vector-icons/MaterialIcons'
import ShowfollowersReal from './pages/showfollowersreal';
import { settingsModal } from './redux/actions';
import First from './pages/registerpages/first';
import Second from './pages/registerpages/second';
import Updatecomment from './pages/commentupdate';
import Messagingpage from './pages/messagingpage';

const Tab=createBottomTabNavigator()
const Stack=createNativeStackNavigator()
const store=configureStore({reducer:genelResponseReducer})




const Home = ({ navigation }) => {
  const dispatch=useDispatch()
  const {genelResponse}=useSelector(state=>state)

  return (
    <Tab.Navigator  >
      <Tab.Screen name='Anasayfa' component={HomePage} options={{tabBarActiveBackgroundColor:"#9FBB73",tabBarIcon:({ color, size }) => (
              <Icon name="home" size={size} color={color} />
            )}}></Tab.Screen>
      <Tab.Screen name='Arama' component={Search} options={{tabBarActiveBackgroundColor:"#9FBB73",tabBarIcon:({ color, size }) => (
              <Icon name="search" size={size} color={color} />
            )}}></Tab.Screen>
      <Tab.Screen name='Bildirim' component={Notification} options={{tabBarActiveBackgroundColor:"#9FBB73",tabBarIcon:({ color, size }) => (
              <Icon name="circle-notifications" size={size} color={color} />
            )}}></Tab.Screen>
      <Tab.Screen name='Mesaj' component={Message} options={{tabBarActiveBackgroundColor:"#9FBB73",tabBarIcon:({ color, size }) => (
              <Icon name="message" size={size} color={color} />
            )}}></Tab.Screen>
      <Tab.Screen name='Profil' component={Profile} options={{
        headerRight:()=>{
          return(
            <Icon.Button name='dehaze' onPress={()=>{
              dispatch(settingsModal(!genelResponse.modalVisible))
              console.log("olmuş olması lazım",genelResponse.modalVisible)
            }
           }></Icon.Button>
          )
        },tabBarIcon:({ color, size }) => (
          <Icon name="person" size={size} color={color} />
        )
      }}></Tab.Screen>
    </Tab.Navigator>
  );
};


const App=()=>{
  return(
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown:false}} > 
        <Stack.Screen name='Home' component={Home} options={({navigation})=>({
          headerRight:()=>(
            <Button onPress={()=>console.log("header uton")} title='bas'></Button>
          )
        })}></Stack.Screen>
        <Stack.Screen name='HomePage' component={HomePage} options={{
          headerLeft:null
        }}></Stack.Screen>
        <Stack.Screen name='Login' component={Login}></Stack.Screen>
        <Stack.Screen name='Profile' component={Profile} options={({navigation})=>({
          headerRight:()=>(
            <Button onPress={()=>console.log("header uton")} title='bas'></Button>
          )
        })} ></Stack.Screen>
        <Stack.Screen name='ProfileUpdate' component={Profileupdate} ></Stack.Screen>
        <Stack.Screen name='Otheruserprofile' component={Otheruserprofile} ></Stack.Screen>
        <Stack.Screen name='Singlepost' component={Singlepost} ></Stack.Screen>
        <Stack.Screen name='Showfollowers' component={Showfollowers} ></Stack.Screen>
        <Stack.Screen name='Updatepost' component={Updatepost} ></Stack.Screen>
        <Stack.Screen name='ShowfollowersReal' component={ShowfollowersReal} ></Stack.Screen>
        <Stack.Screen name='FirstRegister' component={First} ></Stack.Screen>
        <Stack.Screen name='SecondRegister' component={Second} ></Stack.Screen>
        <Stack.Screen name='Updatecomment' component={Updatecomment} ></Stack.Screen>
        <Stack.Screen name='Messagingpage' component={Messagingpage} ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}


export default App;
