import { View, Text ,FlatList,TouchableOpacity,StyleSheet} from 'react-native'
import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Card } from 'react-native-paper'

export default function Message({navigation}) {
    const[m,setM]=useState()
    const { genelResponse } = useSelector(state => state)

  useEffect(()=>{
     async function getMessage(){
      try {
        const response = await axios.get('http://10.0.2.2:3000/message')
        const result=response.data
        const filtered=result.filter(item=>item.user1==genelResponse.kullaniciadi)
        setM(filtered)
      } catch (error) {
        console.error('mesaj atılmadı', error);
      }
    };
    getMessage()
  },[m])

  const renderItem=({item})=>(
    <TouchableOpacity onPress={()=>{
      navigation.navigate("Messagingpage",{kullaniciadi:item.user2})
    }}>
      <Card style={style.card}>
        <Text>{item.user2}</Text>
      </Card>
    </TouchableOpacity>
    )
  return (
    <View>
      <FlatList
      renderItem={renderItem}
      data={m}
      ></FlatList>
    </View>
  )
}

const style=StyleSheet.create({
  card:{
    height:"100%",
    backgroundColor:"pink",
    marginBottom:10,
    
  }
})