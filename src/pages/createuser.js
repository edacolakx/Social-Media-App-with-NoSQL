import { View, Text ,TextInput,StyleSheet, Alert} from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import {createNewUser} from '../components/controller';
import { Button } from 'react-native-paper';

export default function Createuser() {

      const [name,setName]=useState("")
      const [surname,setSurname]=useState("")
      const [email,setEmail]=useState("")
      const [phone,setPhone]=useState("")
      const [username,setUsername]=useState("")
      const [birthday,setBirthday]=useState("")
      const [password,setPassword]=useState("")
          function onName(tex){
             setName(tex)
          }
          function onSurname(tex){
             setSurname(tex)
          }
          function onEmail(tex){
             setEmail(tex)
          }
          function onPhone(tex){
              setPhone(tex)
          }
          function onUsername(tex){
              setUsername(tex)
          }
          function onBirthday(tex){
              setBirthday(tex)
         }
          function onPassword(tex){
              setPassword(tex)
         }
                    
        const userInfo = {
            adi: name,   
            soyadi:surname,
            email:email,
            telefon:phone,
            kullaniciadi:username,
            dogumgunu:birthday,
            sifre:password
        };
   
        function press() {
            if (name=="" && surname=="" && email=="" && phone=="" &&username=="" &&birthday==""&&password=="") {
                {
                    Alert.alert(
                        'Alert Title',
                        'My Alert Msg',
                        [
                          {
                            text: 'Tamam',
                          },
                        ],
                     
                      );
                }
            }
            else{
            console.log(name)
            createNewUser(userInfo);
        }}
        

  return (
    

    <View style={styles.container}>
      <TextInput style={styles.input} onChangeText={onName} placeholder='Adınızı giriniz' ></TextInput>
      <TextInput style={styles.input} onChangeText={onSurname} placeholder='Soyadınızı giriniz'></TextInput>
      <TextInput style={styles.input} onChangeText={onEmail} placeholder='Email giriniz'></TextInput>
      <TextInput style={styles.input} onChangeText={onPhone} placeholder='Telefon giriniz'></TextInput>
      <TextInput style={styles.input} onChangeText={onUsername} placeholder='kullanıcı adı giriniz'></TextInput>
      <TextInput style={styles.input} onChangeText={onBirthday} placeholder='dg giriniz'></TextInput>
      <TextInput style={styles.input} onChangeText={onPassword} placeholder='sifre giriniz'></TextInput>
      <Button title='bas' onPress={press} style={styles.button}>KAYIT OL</Button>
      </View>

)
}

const styles=StyleSheet.create({
    input:{
        backgroundColor:"#A25772",
        width:350,
        alignSelf:"center",
        marginBottom:20,
        marginTop:20,
        borderRadius:15
    },
    container:{
        backgroundColor:"#F1EB90",
        flex:1
    },
    button:{
        backgroundColor:"#EC8F5E",
        width:350,
        alignSelf:"center",
        marginTop:10
    }
})