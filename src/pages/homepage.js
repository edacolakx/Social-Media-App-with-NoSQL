import { View, Text,Modal ,TextInput,StyleSheet,FlatList,RefreshControl,ActivityIndicator} from 'react-native'
import React, { useState,useEffect } from 'react'
import { Button } from 'react-native-paper'
import {createNewPost}  from "../components/controller"
import { useDispatch,useSelector } from 'react-redux'
import { FAB } from "@rneui/themed";
import axios from 'axios'
import { SafeAreaView } from 'react-native-safe-area-context'
import { refreshPosts,setPosts } from '../redux/actions'
import Toast,{BaseToast} from 'react-native-toast-message';
import Homepageposts from '../components/homepageposts'


const HomePage=({navigation})=> {
    const [modalVisible,setModalVisible]=useState(false)
    const [baslik,setBaslik]=useState("")
    const [yazi,setYazi]=useState("")
    const dispatch=useDispatch()
    const {genelResponse}=useSelector(state=>state)
    const [get, setGet] = useState(true);
    const[liste,setListe]=useState([])
    const [loading, setLoading] = useState(true);
    const [loadingfollowing, setLoadingfollowing] = useState(true);
   function onYazi(yazi){
       setYazi(yazi)
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
      style={{ borderLeftColor: 'pink' ,backgroundColor:"#7BD3EA"}}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
    />
    )
   }
   const post={
    baslik:baslik,
    yazi:yazi,
    kullaniciadi:genelResponse.kullaniciadi
   }
   function press(){

    createNewPost(post)
    setModalVisible(!modalVisible)
    showToast()
   }

   useEffect(()=>{
    async function getPosts(){
        try {
            const response = await axios.get('http://10.0.2.2:3000/posts')
                const data = response.data;
                dispatch(setPosts(data))
                setLoading(false)
            } catch (error) {
                console.log("hata",error);
            }
        };
       getPosts()

       async function getFollowersPosts(){
        try
            {
              const liste=[]
                const response= await axios.get('http://10.0.2.2:3000/register/'+genelResponse.kullaniciadi)
                const data=response.data               

                const response1= await axios.get('http://10.0.2.2:3000/posts')
                const data1 = response1.data;
                for(var i=0;i<data.length;i++){
                    const myPosts = data1.filter(item => item.kullaniciadi === data[i].kullaniciadi); 
                   
                    liste.push(myPosts)
                  }
                  const flatarray = liste.flat();
                  setListe(flatarray)
                    setLoadingfollowing(false)
            }
            catch(e){
                console.log(e)
            }
       }
       getFollowersPosts()

    },[liste])
    const[somunique,setSomeunique]=useState("")
const renderItem = ({ item }) => (

  <Homepageposts kullaniciadi={item.kullaniciadi} yazi={item.yazi}
      likes={item.likes} unique={item.unique} navigation={navigation} review={item.review} 
  ></Homepageposts> 
);



useEffect(()=>{
  dispatch(refreshPosts())
},[dispatch])
const [refresh,setRefresh]=useState(false)

const onRefresh = () => {
  // Yenileme işlemi başlat
  //dispatch(refreshPosts());
  async function getPosts(){
    try {
        const response = await axios.get('http://10.0.2.2:3000/posts')
            const data = response.data;
            dispatch(setPosts(data));
           // setData(data)
        } catch (error) {
            console.error("hata",error);
        }
    };getPosts()
    async function getFollowersPosts(){
      try
          {
            const liste=[]
              const response= await axios.get('http://10.0.2.2:3000/register/'+genelResponse.kullaniciadi)
              const data=response.data               

              const response1= await axios.get('http://10.0.2.2:3000/posts')
              const data1 = response1.data;
              for(var i=0;i<data.length;i++){
                  const myPosts = data1.filter(item => item.kullaniciadi === data[i].kullaniciadi); 
                  liste.push(myPosts)
                }
                const flatarray = liste.flat();
                setListe(flatarray)
                  
          }
          catch(e){
              console.log(e)
          }
     }
     getFollowersPosts()
     
  setRefresh(!refresh)
};

const[pressed,setPressed]=useState(false)
  return (
<SafeAreaView style={style.container} >
    
       <View>
          <Modal animationType='slide' visible={modalVisible} onRequestClose={()=>{setModalVisible(!modalVisible)}}>
              <TextInput placeholder='Ne düşünüyorsun..' onChangeText={onYazi} style={style.topinput}></TextInput>
              <Button  onPress={press} mode='contained' style={style.button}>Gönder</Button>
              <Button  onPress={()=>setModalVisible(false)} mode='contained' style={style.button}>Geri</Button>
          </Modal>
       </View>  

       <View style={{flexDirection:'row',justifyContent:'center'}}>
        
        <Button
          onPress={() =>{ 
            setGet(true)

          }}
          style={{marginRight:50}} >
          <Text style={{fontStyle:get ?"italic":"normal",fontWeight:"bold",color:"black"}}>Takip edilenler</Text>
        </Button>

        <Button
          onPress={() => setGet(false)}
          style={{marginLeft:50}}
          >
          <Text  style={{fontStyle:get ?"normal":"italic",fontWeight:"bold",color:"black"}}>Keşfet</Text>
      </Button>
      </View>
          
          {
            get?(
              loadingfollowing?(
                <ActivityIndicator size="large" color="black"></ActivityIndicator>
              ):(

              <View style={{marginTop:20}}>
              <FlatList data={liste} renderItem={renderItem} refreshControl={
                <RefreshControl refreshing={genelResponse.refreshing} onRefresh={onRefresh}></RefreshControl>
              }></FlatList>
              </View>
              )
            ):(
              loading?(
                <ActivityIndicator size="large" color="black"></ActivityIndicator>
              ):(
            <View style={{marginTop:20}}>
              <FlatList data={genelResponse.posts} renderItem={renderItem} refreshControl={
                <RefreshControl refreshing={genelResponse.refreshing} onRefresh={onRefresh}></RefreshControl>
              }></FlatList>
              </View>
              ))
          }
                 
        <FAB title={"+"} style={{flex:1}} visible={true} color='black' placement='right' size='large' onPress={()=>{setModalVisible(!modalVisible)}}></FAB>
        <Toast config={toastConfig} />
        </SafeAreaView>

  )
}

export default HomePage;

const style=StyleSheet.create({
  container:{
    flex:1,
  },
  button:{
    backgroundColor:"#EC8F5E",
    width:350,
    alignSelf:"center",
    marginTop:10
  },
  topinput:{
    backgroundColor:"beige",
    width:350,
    alignSelf:"center",
    marginBottom:20,
    marginTop:100,
    borderRadius:15
  },
  }
)