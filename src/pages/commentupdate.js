import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { updateComment } from '../components/controller'
import { Button, TextInput } from 'react-native-paper'
export default function Updatecomment({navigation}) {
    const receivedData = useRoute().params?.veri
    const y = useRoute().params?.yazi
    const[change,setChange]=useState("")
    function onChange(tex){
        setChange(tex)
      }
      const updatedPost={
        yorum:change,
        which:"yorumupdate"
       }
      function pressButton(){
        
        updateComment(receivedData,updatedPost)
        console.log('Güncelledi',updatedPost)
        navigation.navigate("Home")
       }
  return (
    <View>
    <TextInput mode='outlined' defaultValue={y} onChangeText={onChange} ></TextInput>
      <Button onPress={pressButton}>Güncelle</Button>
    </View>
  )
}