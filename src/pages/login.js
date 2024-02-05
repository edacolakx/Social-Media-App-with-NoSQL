import React, { useState, useEffect } from 'react';
import { View,Text,StyleSheet ,TouchableOpacity, Alert} from 'react-native';
import SecureStorage from 'rn-secure-storage';
import axios from 'axios';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage'
import { setName } from '../redux/actions';
import { useDispatch,useSelector } from 'react-redux';
import { Button,TextInput } from 'react-native-paper';
import FastImage from 'react-native-fast-image';




const Login = ({ navigation }) => {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
    const dispatch=useDispatch()

  useEffect(() => {
    checkLoginStatus;
  }, []);

  const checkLoginStatus = async () => {
    try {
      const storedToken = await SecureStorage.getItem('token');
      if (storedToken) {
        console.log("1")
        setToken(storedToken);
      }
    } catch (error) {
      console.error('Oturum kontrol hatası: ', error);
    }
  };

  async function handleLogin   ()  {
    try {
      console.log("noldu")
      const response = await axios.post('http://10.0.2.2:3000',{username,password})
      const data=response.data
      await RNSecureStorage.set('token',data.token,{accessible:ACCESSIBLE.WHEN_UNLOCKED})
      .then((res)=>{
        setToken(data.token);
      })  
      navigation.navigate('Home')
    } catch (error) {
      {
        Alert.alert(
          "Eksik yada hatalı bilgi girdiniz",
            "",
            [
              {
                text: "İptal",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              }
            ]
        )
      }
    }
  };

  const handleLogout = async () => {

    try {
      await RNSecureStorage.remove('token');

      setToken('');
    } catch (error) {
      console.error('Çıkış hatası: ', error);
    }
  };
  return (
    <View style={style.container}>

        <View>       
        <FastImage
        style={style.gif}
        source={
            require("../assets/mygif.gif") }
        resizeMode={FastImage.resizeMode.contain}
    />
          <TextInput
            style={style.input}
            onChangeText={(t)=>{
              dispatch(setName(t))
              setUsername(t)
            }}
            mode='outlined'
            label={"Kullanıcı Adı"}
          />
          <TextInput
            secureTextEntry
            value={password}
            style={style.input1}
            onChangeText={setPassword}
            mode='outlined'
            label={"Şifre"}
          />
          <Button  onPress={handleLogin} >Giriş yap</Button>
            <TouchableOpacity onPress={()=>{navigation.navigate('FirstRegister')}} style={{alignSelf:"center"}}>
              <Text>Kayıt Ol</Text>
            </TouchableOpacity>
        </View>

    </View>
  );
};

export default Login;


const style=StyleSheet.create({
  input:{
  marginBottom:10,
  width:300,
  alignSelf:"center",
  marginTop:50,
  backgroundColor:"#FFA372",

  },
  input1:{
  marginBottom:10,
  width:300,
  alignSelf:"center",
  backgroundColor:"#FFA372",

  },
  container:{
    flex:1,
    backgroundColor:"#FFA372",
    position: 'absolute',
    width: "100%",
    height: "100%",

  },
  gif:{
     width: 200, 
     height: 200,
     alignSelf:"center" ,
     marginTop:100
  }
})