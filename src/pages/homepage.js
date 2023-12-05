import { View, Text,Modal ,TextInput} from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-paper'
import {createNewPost}  from "../components/controller"
export default function HomePage() {
    const [modalVisible,setModalVisible]=useState(false)
    const [baslik,setBaslik]=useState("")
    const [yazi,setYazi]=useState("")
    function onBaslik(baslik){
      setBaslik(baslik)
   }
   function onYazi(yazi){
       setYazi(yazi)
   }

   const post={
    baslik:baslik,
    yazi:yazi
   }
  
   function press(){

    createNewPost(post)
    setModalVisible(!modalVisible)
   }

  return (
    <View>
       <View>
          <Modal animationType='slide' visible={modalVisible} onRequestClose={()=>{setModalVisible(!modalVisible)}}>
              <Text>Eda</Text>
              <TextInput placeholder='Başlık' onChangeText={onBaslik}></TextInput>
              <TextInput placeholder='Yazı' onChangeText={onYazi}></TextInput>
              <Button  onPress={press} mode='contained'>Bas</Button>
          </Modal>
        </View>
      <Text>HomePage</Text>
      <Button  onPress={()=>{setModalVisible(!modalVisible)}} mode='contained'>Bas</Button>
    </View>
  )
}