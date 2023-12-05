import React, { useState, useEffect } from 'react';
import { View, Button, TextInput } from 'react-native';
import SecureStorage from 'rn-secure-storage';
import axios from 'axios';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage'
const Login = ({ navigation }) => {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Uygulama yüklenirken tokeni kontrol et
    checkLoginStatus;
  }, []);

  const checkLoginStatus = async () => {
    try {
      const storedToken = await SecureStorage.getItem('token');
      if (storedToken) {
        // Eğer token varsa, kullanıcı oturumda demektir
        console.log("1")
        setToken(storedToken);
      }
    } catch (error) {
      console.error('Oturum kontrol hatası: ', error);
    }
  };

  async function handleLogin   ()  {
    try {
      // Kullanıcı adı ve şifre ile sunucuya istek yaparak token al
      console.log("noldu")

      const response = await axios.post('http://10.0.2.2:3000',{username,password})
      console.log("noldu1")

      const data=response.data
      console.log("noldu2")

      // Tokeni Secure Storage'e kaydet
      await RNSecureStorage.set('token',data.token,{accessible:ACCESSIBLE.WHEN_UNLOCKED})
      .then((res)=>{

        setToken(data.token);
      })
      console.log("noldu3")
      // Oturumu başlat
      
      navigation.navigate('HomePage')

    } catch (error) {
      console.error('Giriş hatası: ', error);
    }
  };

  const handleLogout = async () => {

    try {
      // Oturumu sonlandır: Secure Storage'den tokeni kaldır
      await SecureStorage.removeItem('token');
      setToken('');
    } catch (error) {
      console.error('Çıkış hatası: ', error);
    }
  };

  return (
    <View>
      {!token ? (
        <View>
          <TextInput
            placeholder="Kullanıcı adı"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            placeholder="Şifre"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button title="Giriş Yap" onPress={handleLogin} />
        </View>
      ) : (
        <Button title="Çıkış Yap" onPress={handleLogout} />
      )}
    </View>
  );
};

export default Login;
