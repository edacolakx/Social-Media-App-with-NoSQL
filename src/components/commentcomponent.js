import { View, Text ,StyleSheet,Modal,TextInput,FlatList,TouchableOpacity,RefreshControl, Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-native-paper'
import { createNewComment, createNewReply, deleteComment, deleteReply, notificationFunction } from './controller'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { likePost,dontlike } from './controller'
import Replycomponent from './replycomponent'

export default function Commentcomponent(props) {
    const[modalVisible,setModalVisible]=useState(false)
    const[yanit,setYanit]=useState("")
    const {genelResponse}=useSelector(state=>state)
    const[replies,setReplies]=useState("")
    const[counterlikes,setCounterlikes]=useState(0)
    const [isTrue,setIsTrue]=useState("")
    useEffect(()=>{
      async function getReplies(){
        try
        {
          const response = await axios.get('http://10.0.2.2:3000/replies')
          const dataa=response.data

          const filtered=dataa.filter(item=>item.uniquecomment===props.unique)
          setReplies(filtered)
        }
        catch(e){
          console.log("youu",e)
        }
      }
      getReplies()
      async function abc() {  
               try{
                const response= await axios.get('http://10.0.2.2:3000/like/'+genelResponse.kullaniciadi+'/'+props.unique+'/comment')
                const result=response.data
                setIsTrue(result.like)
              }
              catch(e){
                console.log("axios2",e)
              }
            }
          abc()
          setCounterlikes(props.likes)
    },[replies])
    function onYanit(tex) {
      setYanit(tex)
    }
    function handleModal() {
      setModalVisible(!modalVisible)
    }
    const veri={
      yanit:yanit,
      kullaniciadi:genelResponse.kullaniciadi,
      uniquecomment:props.unique,
      responseperson:props.kullaniciadicomment
    }
  
    const notificationdata={
      kullaniciadi1:genelResponse.kullaniciadi,
      getter:props.kullaniciadicomment,
      which:"reply",
      commentunique:props.unique
    }
    const notificationdatap={
      kullaniciadi1:genelResponse.kullaniciadi,
      getter:props.kullaniciadi,
      which:"postreply",
      postunique:props.unique2
    }

    function pressButton(){
      createNewReply(veri)
      setModalVisible(false)
      console.log("yanıt verdi")
      if (notificationdata.getter!=genelResponse.kullaniciadi) {
        
        notificationFunction(notificationdata)
      }
      if (notificationdatap.getter!=genelResponse.kullaniciadi) {
        
        notificationFunction(notificationdatap)
      }
      console.log("da",notificationdata)
      console.log("ns",notificationdatap)
    }
  
    const renderItems = ({ item }) => (
      <Replycomponent 
      kullaniciadi={item.kullaniciadi}
      responseperson={item.responseperson}
      uniqueresponse={item.uniqueresponse}
      yanit={item.yanit}
      />
      );

      const onRefresh = () => {
        async function getReplies(){
          try
          {
            const response = await axios.get('http://10.0.2.2:3000/replies')
            const dataa=response.data
            console.log(dataa)
  
            const filtered=dataa.filter(item=>item.uniquecomment===props.unique)
            setReplies(filtered)
            console.log("kullanıcıadı",filtered[0].kullaniciadi)
            console.log("uniquesi",filtered[0].uniqueresponse)
            setUsername(filtered[0].kullaniciadi)
            setuniquesi(filtered[0].uniqueresponse)
            console.log(filtered[0].uniqueresponse)
            setlikesreply(Number(filtered[0].likes))
            
          }
          catch(e){
            console.log("deliate",e)
          }
        }
        getReplies()
       
        setRefresh(!refresh)
        console.log("orda yeniledim")

      };
      const [refresh,setRefresh]=useState(false)
      const [a,setA]=useState("")
      function onT(tex){
        setA(tex)
      }
      
let data={
  kullaniciadi:genelResponse.kullaniciadi,
  unique:props.unique,
  which:"comment"
}
const notificationdataclike={
  kullaniciadi1:genelResponse.kullaniciadi,
  getter:props.kullaniciadicomment,
  which:"commentlike",
  commentunique:props.unique
}
  return (
    <View>
          <View>
          <Modal animationType='slide' visible={modalVisible} onRequestClose={()=>{setModalVisible(!modalVisible)}}>
              <TextInput placeholder='yanıt ver' onChangeText={onYanit} style={style.topinput}></TextInput>
              <Button  onPress={pressButton} mode='contained' style={style.button}>Gönder</Button>
              <Button  onPress={()=>setModalVisible(false)} mode='contained' style={style.button}>Geri</Button>
          </Modal>
       </View>
   <Card style={style.card}>
      <Text>{props.kullaniciadicomment} </Text>
      <Text>{props.kullaniciadi} kullanıcısına yanıt</Text>
      <Text>{props.yorum}</Text>
      <View style={{flexDirection:"row-reverse"}}>

          {
            props.kullaniciadicomment==genelResponse.kullaniciadi?(
              <View style={{flexDirection:"row-reverse"}}>
              <Icon.Button
              name='edit'
              onPress={()=>props.navigation.navigate("Updatecomment",{veri:props.unique,yazi:props.yorum})}
              style={{backgroundColor:"#FFEBD8"}}
              ></Icon.Button>
                <Icon.Button
        name='delete-sweep'
        onPress={() =>{
          {
            Alert.alert(
              "Silmek istediğine emin misin",
              "",
              [
                {
                  text:"Evet",
                  onPress:()=>{deleteComment(props.unique)
                    console.log(props.unique)
                  console.log("silin")
                  }
                },
                {
                  text:"Hayır",
                  onPress:()=>console.log("basıldı")
                }
              ]
            )
          }
        }}
        style={{backgroundColor:"#FFEBD8"}}
        ></Icon.Button>
              </View>
              ):(
                null
                )
              }
      <Icon.Button name='chat-bubble-outline' onPress={handleModal} style={{backgroundColor:"#FFEBD8"}}></Icon.Button>
      {isTrue?(
              <Icon.Button
               name="favorite"
               onPress={()=>{
                 dontlike(genelResponse.kullaniciadi,props.unique,"comment")
                 setIsTrue(false)
                 setCounterlikes(counterlikes-1)
                }}
                style={{backgroundColor:"#FFEBD8"}}
                >
               <Text>{Number(counterlikes)}</Text>

               </Icon.Button>
            ):
            (<Icon.Button
              name="favorite-outline"
              onPress={()=>{
                likePost(data) 
                setIsTrue(true)
                setCounterlikes(counterlikes+1)
                if (notificationdataclike.getter!=genelResponse.kullaniciadi) {
                  
                  notificationFunction(notificationdataclike)
                }
              }}
              style={{backgroundColor:"#FFEBD8"}}
              ><Text>{Number(counterlikes)}</Text>
            </Icon.Button>)}
              </View>
   </Card>
        <FlatList renderItem={renderItems} data={replies} style={{flex:1}} refreshControl={
            <RefreshControl refreshing={genelResponse.refreshing} onRefresh={onRefresh}></RefreshControl>
          }
></FlatList>

    </View>
  )
}

const style=StyleSheet.create({
    card:{
        backgroundColor:"#FFEBD8",
        marginTop:10,
        marginLeft:5
    }
})