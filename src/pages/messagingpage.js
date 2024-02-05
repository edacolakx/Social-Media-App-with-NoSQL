import { View, Text ,FlatList} from 'react-native'
import React, { useState,useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { useSelector } from 'react-redux'
import { TextInput ,Button, Card,Avatar} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useRoute } from '@react-navigation/native'
import { sendMessage } from '../components/controller'
import axios from 'axios'
import Messagecomp from '../components/messagecomp'

export default function Messagingpage() {
    const { genelResponse } = useSelector(state => state)
    const [messages,setMessages]=useState()
    const [texts,settexts]=useState([])
    const[resim,setResim]=useState()
    const[ad,setad]=useState()
    const[soyad,setsoyad]=useState()
    const kullaniciadi = useRoute().params?.kullaniciadi
    useEffect(()=>{
      async  function getTexts() {
        try {
          let liste=[] 
            const result=await axios.get('http://10.0.2.2:3000/message/'+genelResponse.kullaniciadi+'/'+kullaniciadi)
            const data=result.data
            const result1=await axios.get('http://10.0.2.2:3000/message/'+kullaniciadi+'/'+genelResponse.kullaniciadi)
            const data1=result1.data
            const mergedData = data.concat(data1)
            for (let i = 0; i < mergedData.length; i++) {
              const time=mergedData[i].date.substring(0, mergedData[i].date.indexOf("."))
              liste.push({ date: new Date(time), message: mergedData[i].message ,sender: mergedData[i].sender,getter: mergedData[i].getter});
            }
           liste.sort((a,b)=>a.date - b.date)
           settexts(liste)
        } catch (error) {
            console.log(error)
        }
        }
        getTexts()

        async function getPerson(){
          const result=await axios.get("http://10.0.2.2:3000/register")
          const data=result.data
          const filtered=data.filter(item=>item.kullaniciadi==kullaniciadi)
          setResim(filtered[0].resim)
          setad(filtered[0].adi.charAt(0).toUpperCase())
          setsoyad(filtered[0].soyadi.charAt(0).toUpperCase())
        }
        getPerson()
        
   
    },[texts])

    function onMessage(tex) {
        setMessages(tex)
    }
    const data={
        which:"texted",
        sender:genelResponse.kullaniciadi,
        getter:kullaniciadi,
        date:new Date(),
        message:messages
    }
    function handleButton() {
        sendMessage(data)
        setMessages('')
    }
    const renderItem=({item})=>(
      <Messagecomp sender={item.sender} message={item.message} getter={item.getter}></Messagecomp>
      )
  return (
    <View style={{alignSelf:"flex-end"}}>

      <Card >
      <View style={{flexDirection:"row"}}>
      {
        resim?(
          <View>
                        <Avatar.Image size={80} source={{
                          uri:"data:image/png;base64,"+resim,
                        }} />
                        </View>
                    ):(
                      <Avatar.Text size={80} label={ad+soyad} />
                      )
                    }
        <Text style={{fontSize:30,marginLeft:80}}>{kullaniciadi}</Text>
                    </View>
      </Card>
      <FlatList 
      renderItem={renderItem}
      data={texts}
      style={{marginBottom:10}}
      ></FlatList>
      <View style={{flexDirection:"row" ,backgroundColor:"pink"}}>

      <TextInput  mode='outlined' style={{width:"89%"}} onChangeText={onMessage} value={messages} placeholder={"Mesajınızı yazın"}></TextInput>
      <Icon.Button
        name='arrow-forward-ios'
        onPress={handleButton}
        style={{backgroundColor:"pink",height:60}}
        ></Icon.Button>
        </View>
    </View>
  )
}