import { View, Text ,StyleSheet,Modal,TextInput, FlatList, TouchableOpacity,RefreshControl} from 'react-native'
import React ,{useEffect, useState}from 'react'
import { useRoute } from '@react-navigation/native'
import axios from 'axios'
import { Button, Card } from 'react-native-paper'
import { createNewComment, notificationFunction } from '../components/controller'
import { useDispatch, useSelector } from 'react-redux'
import Commentcomponent from '../components/commentcomponent'
import Toast,{BaseToast} from 'react-native-toast-message';
import { likePost,dontlike } from '../components/controller'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default function Singlepost({navigation}) {
    const receivedData = useRoute().params?.veri
    const[data,setData]=useState("")
    const[username,setUsername]=useState("")
    const[unik,setUnik]=useState("")
    const[comments,setComments]=useState([])
    const[replies,setReplies]=useState("")
    const[myfilters,setMyfilters]=useState("")
    const[likes,setlikes]=useState("")
    const[review,setreview]=useState("")
    const {genelResponse}=useSelector(state=>state)
    const dispatch=useDispatch()
    const [isTrue,setIsTrue]=useState("")

    const[counterlikes,setCounterlikes]=useState(0)

  
    
    useEffect(()=>{
        async function getPosts(){
            try {
                const response = await axios.get('http://10.0.2.2:3000/posts')   
                const data = response.data;
                const my = data.filter(item => item.unique === receivedData);
                setData(my[0].yazi)
                setUsername(my[0].kullaniciadi)
                setUnik(my[0].unique)
                setlikes(my[0].likes)
                setreview(my[0].review)
            }catch (error) {
                console.error("hata",error);
        }
    }
    getPosts()
      async function getComments(){
        try
        {
          const response = await axios.get('http://10.0.2.2:3000/comments')
          const dataa=response.data
          const myfilter=dataa.filter(item=>item.kullaniciadi===genelResponse.kullaniciadi)
          setMyfilters(myfilter)
          const filtered=dataa.filter(item=>item.unique===unik)
          const sortedData = filtered.slice().sort((a, b) => b.likes - a.likes);
          setComments(sortedData)
          
        }
        catch(e){
          console.log("axios8",e)
        }
      }
      getComments()
      async function getReplies(){
        try
        {
          const response = await axios.get('http://10.0.2.2:3000/replies')
          const dataa=response.data
          const filtered=dataa.filter(item=>item.uniquecomment==comments[0].uniquecomment)
          setReplies(filtered)
        }
        catch(e){
        }
      }
      getReplies()
      async function abc() {  
        try{
                const response= await axios.get('http://10.0.2.2:3000/like/'+genelResponse.kullaniciadi+'/'+unik+'/post')
                const result=response.data
                setIsTrue(result.like)
              }
              catch(e){
                console.log("axios5",e)
        }
            }
          abc()
          setCounterlikes(likes)
          
        },[comments])

let data2={
  kullaniciadi:genelResponse.kullaniciadi,
  unique:unik
}

const notificationdata={
  kullaniciadi1:genelResponse.kullaniciadi,
  getter:username,
  which:"postlike",
  postunique:unik
}
const [modalVisible,setModalVisible]=useState(false)
const[yorum,setYorum]=useState("")
function onYorum(Yorum){
  setYorum(Yorum)
}
const veri={
  yorum:yorum,
  kullaniciadi:username,
  unique:unik,
  commentperson:genelResponse.kullaniciadi
}
const notificationdatacomment={
  kullaniciadi1:genelResponse.kullaniciadi,
  getter:username,
  which:"comment",
  postunique:unik
}
function press() {
  createNewComment(veri)
  setModalVisible(false)
  showToast()
  if (notificationdatacomment.getter!=genelResponse.kullaniciadi) {
    
    notificationFunction(notificationdatacomment)
  }
}

const showToast = () => {
  Toast.show({
    type: 'success',
    text1: 'Başarı',
    text2: 'Gönderildi 👋',
    swipeable: true,

  });
}
const toastConfig={
  success:(props)=>(
    <BaseToast
    {...props}
    style={{ borderLeftColor: 'pink' ,backgroundColor:"green"}}
    contentContainerStyle={{ paddingHorizontal: 15 }}
    text1Style={{
      fontSize: 15,
      fontWeight: '400'
    }}
  />
  )
 }
const renderItem = ({ item }) => (
  
  <Commentcomponent likes={item.likes} navigation={navigation} unique={item.uniquecomment} yorum={item.yorum} kullaniciadi={item.kullaniciadi} kullaniciadicomment={item.commentperson} unique2={item.unique}></Commentcomponent>
);
const onRefresh = () => {
  async function getPosts(){
    try {
        const response = await axios.get('http://10.0.2.2:3000/posts')   
        const data = response.data;
        console.log(data)
        const my = data.filter(item => item.yazi === receivedData);
        console.log(my)
        setData(my[0].yazi)
        setUsername(my[0].kullaniciadi)
        setUnik(my[0].unique)
        setlikes(my[0].likes)
        console.log("aaa",my[0].yazi)
    }catch (error) {
        console.error("hata",error);
}
}
getPosts()
async function getComments(){
try
{
  const response = await axios.get('http://10.0.2.2:3000/comments')
  const dataa=response.data
  console.log(dataa)
  const myfilter=dataa.filter(item=>item.kullaniciadi===genelResponse.kullaniciadi)
  setMyfilters(myfilter)
  const filtered=dataa.filter(item=>item.unique===unik)
  setComments(filtered)
}
catch(e){
  console.log(e)
}
}
getComments()
async function getReplies(){
try
{
  const response = await axios.get('http://10.0.2.2:3000/replies')
  const dataa=response.data
  console.log(dataa)

  const filtered=dataa.filter(item=>item.uniquecomment===comments[0].uniquecomment)
  setReplies(filtered)
}
catch(e){
  console.log(e)
}
}
getReplies()
async function abc() {  
try{
        const response= await axios.get('http://10.0.2.2:3000/like/'+genelResponse.kullaniciadi+'/'+unik+'/post')
        const result=response.data
        console.log("sinco",result.like)
        setIsTrue(result.like)
      }
      catch(e){
}
        console.log(e)
    }
  abc()
  setCounterlikes(likes)
  async function getReplies(){
    try
    {
      const response = await axios.get('http://10.0.2.2:3000/replies')
      const dataa=response.data
      console.log(dataa)

      const filtered=dataa.filter(item=>item.uniquecomment===props.unique)
  
      
    }
    catch(e){
      console.log(e)
    }
  }
  getReplies()
  setRefresh(!refresh)
  console.log("burda yeniledim")
};


const [refresh,setRefresh]=useState(false)

  return (
    <View style={{flex:1}}>
       <View>
          <Modal animationType='slide' visible={modalVisible} onRequestClose={()=>{setModalVisible(!modalVisible)}}>
              <TextInput placeholder='Ne düşünüyorsun..' onChangeText={onYorum} style={style.topinput}></TextInput>
              <Button  onPress={press} mode='contained' style={style.button}>Gönder</Button>
              <Button  onPress={()=>setModalVisible(false)} mode='contained' style={style.button}>Geri</Button>
          </Modal>
       </View> 
      <Card style={style.card}>
      <Text>@{username}</Text>
      <Text>{data}</Text>
      <Text></Text>
      <Text>{review} Görüntülenme</Text>
      <View style={{flexDirection:"row-reverse"}}>
      <Icon.Button name='chat-bubble-outline' onPress={()=>{
                    setModalVisible(!modalVisible)
          }} style={{backgroundColor:"#FFC5C5"}}></Icon.Button>
      {isTrue?(
              <Icon.Button
               name="favorite"
               onPress={()=>{
                 dontlike(genelResponse.kullaniciadi,unik,"post")
                 setIsTrue(false)
                 setlikes(likes-1)
                }}
                style={{backgroundColor:"#FFC5C5"}}
                >
               <Text>{Number(likes)}</Text>

               </Icon.Button>
            ):
            (<Icon.Button
              name="favorite-outline"
              onPress={()=>{
                likePost(data2) 
                setIsTrue(true)
                setlikes(likes+1)
                if (notificationdata!=genelResponse.kullaniciadi) {
                  
                  notificationFunction(notificationdata)
                }
              }}
              style={{backgroundColor:"#FFC5C5"}}
              ><Text>{Number(likes)}</Text>
            </Icon.Button>)}
      </View>
      </Card>
      <Text style={{fontSize:20,fontWeight:'bold'}}>Yorumlar</Text>
      <FlatList renderItem={renderItem} data={comments} style={{flex:1}}  refreshControl={
            <RefreshControl refreshing={genelResponse.refreshing} onRefresh={onRefresh}></RefreshControl>
          }
></FlatList>
<Toast config={toastConfig} />
    </View>
  )
}

const style=StyleSheet.create({
  card:{
    marginTop:10,
    backgroundColor:"#FFC5C5"
  }
})