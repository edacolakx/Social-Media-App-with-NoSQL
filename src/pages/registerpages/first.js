import { View, Text ,StyleSheet, Alert} from 'react-native'
import React,{useEffect, useState} from 'react'
import { Button, TextInput } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import axios from 'axios'

export default function First({navigation}) {
    const [email,setEmail]=useState("")
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [password2,setPassword2]=useState("")
    const [istek,setIstek]=useState([])
    useEffect(()=>{
        async function getUsers() {
            try {
                const result=await axios.get("http://10.0.2.2:3000/register")
                const data=result.data
                setIstek(data)
            } catch (error) {
                console.log(error)
            }
        }
        getUsers()
    },[])
    function onEmail(tex){
        setEmail(tex)
     }
    function onPassword(tex){
        setPassword(tex)
      }
    function onPassword2(tex){
        setPassword2(tex)
      }
      function onUsername(tex){
        setUsername(tex)
    }
    const isValidEmail = (email) => {
        // Basit bir e-posta doğrulama düzenli ifadesi
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      
        return emailPattern.test(email);
      };
      const isEmailValid = isValidEmail(email);
    function handlePress() {
        if (email==""|| username=="" || password==""||password!=password2) {
            {
                Alert.alert(
                    "Boş",
                    "",
                    [
                        {
                            text:"ok",
                            onPress:()=>console.log("oka basıldı")
                        }
                    ]
                )
            }
        } else {
            if (isEmailValid) {
                let count=0
                let count1=0
                for (let i = 0; i < istek.length; i++) {
                    if (istek[i].kullaniciadi==username) {
                        count++
                    }
                    if (istek[i].email==email) {
                        count1++
                    }
                }
                if (count==0&&count1==0) {
                    
                    navigation.navigate("SecondRegister",{email:email,password:password,username:username})
                } else {
                    if (count!=0) {
                        
                        {
                            Alert.alert(
                                "Bu kullanıcı adı zaten kullanılıyor",
                                "",
                                [
                                    {
                                        text:"ok",
                                        onPress:()=>console.log("oka basıldı")
                                    }
                                ]
                            )
                        }
                    }else if(count1!=0){

                        {
                            Alert.alert(
                                "Bu email zaten kullanılıyor",
                                "",
                                [
                                    {
                                        text:"ok",
                                        onPress:()=>console.log("oka basıldı")
                                    }
                                ]
                            )
                        }
                    }
                }
            }else{
                {
                    Alert.alert(
                        "invalid email",
                        "",
                        [
                            {
                                text:"ok",
                                onPress:()=>console.log("oka basıldı")
                            }
                        ]
                    )
                }
            }
        }
    }

  return (
    <View style={{backgroundColor:"white",flex:1}}>
      <Text>First</Text>
      <TextInput style={styles.input} onChangeText={onEmail} placeholder='Email giriniz'mode='flat'
            label={"Email"} ></TextInput>
      <TextInput style={styles.input} onChangeText={onUsername} placeholder='kullanıcı adı giriniz'mode='flat'
            label={"Kullanıcı Adı"}></TextInput>
        <TextInput style={styles.input} onChangeText={onPassword} placeholder='sifre giriniz'mode='flat'
            label={"Şifre"}></TextInput>   
        <TextInput style={styles.input} onChangeText={onPassword2} placeholder='sifreyi tekrar giriniz'mode='flat'
            label={"Şifre"}></TextInput>   
           <Icon.Button onPress={handlePress} backgroundColor={"white"}  name='arrow-forward-ios' style={styles.button}></Icon.Button>
    </View>
  )
}
const styles=StyleSheet.create({
    input:{
        backgroundColor:"pink",
        width:350,
        alignSelf:"center",
        marginBottom:20,
        marginTop:20,
        borderRadius:15
    },
    button:{
        width:40,
        backgroundColor:"pink",
        alignSelf:"center"
    }
})