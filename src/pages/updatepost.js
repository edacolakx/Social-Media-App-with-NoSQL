import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { updatePost } from '../components/controller'
import { Button, TextInput } from 'react-native-paper'

export default function Updatepost({navigation}) {
    const receivedData = useRoute().params?.veri
    const y = useRoute().params?.yazi
    const[change,setChange]=useState("")
    function onChange(tex){
        setChange(tex)
      }
      const updatedPost={
        yazi:change,
        which:"yaziupdate"
       }
      function pressButton(){
        
        updatePost(receivedData,updatedPost)
        console.log('Güncelledi',updatedPost)
        navigation.navigate("Profile")
       }
  return (
    <View>
    <TextInput mode='outlined' defaultValue={y} onChangeText={onChange} ></TextInput>
      <Button onPress={pressButton}>Güncelle</Button>
    </View>
  )
}