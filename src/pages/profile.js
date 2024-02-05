import { View, Text,FlatList, RefreshControl,Image,StyleSheet ,Alert, TouchableOpacity} from 'react-native'
import {React,useState,useEffect} from 'react'
import { Card,Modal,PaperProvider,Portal,Avatar} from 'react-native-paper';
import axios from "axios";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch,useSelector } from 'react-redux'
import { setMyPosts ,settingsModal} from '../redux/actions'
import { deletePost } from '../components/controller';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { deletePerson } from '../components/controller';
import { updatePost } from '../components/controller';

export default function Profile({navigation}) {

  const {genelResponse}=useSelector(state=>state)
  const dispatch=useDispatch()
  const[ad,setAd]=useState("")
  const[soyad,setSoyad]=useState("")
  const[dg,setDg]=useState("")
  const[takipcisayisi,setTakipcisayisi]=useState()
  const[takipedilen,settakipedilen]=useState()
  const[bio,setbio]=useState()
  const[image,setimage]=useState("")
 
  useEffect(()=>{
    async function getPosts(){
        try {
            const response = await axios.get('http://10.0.2.2:3000/posts')
                const data = response.data;
                const myPosts = data.filter(item => item.kullaniciadi === genelResponse.kullaniciadi);           
                  dispatch(setMyPosts(myPosts))
            } catch (error) {
                console.error("hathnca",error);
            }
        };
       getPosts()
    async function getPerson(){
        try {
            const response = await axios.get('http://10.0.2.2:3000/register')
                const data = response.data;
                const myPosts = data.filter(item => item.kullaniciadi === genelResponse.kullaniciadi);           
                  setAd(myPosts[0].adi)
                  setSoyad(myPosts[0].soyadi)
                  setDg(myPosts[0].dogumgunu)
                  setTakipcisayisi(myPosts[0].followernumber)
                  setbio(myPosts[0].bio)
                  settakipedilen(Number(myPosts[0].realfollow))
                  setimage(myPosts[0].resim)
            } catch (error) {
                console.error("hathnca",error);
            }
        };
       getPerson()
    },[dispatch,genelResponse.myposts,soyad])
  
 function deletePersonFunction() {

  {
    Alert.alert(
      "Hesabınızı silmek istediğinize emin misiniz?",
      "",
      [
        {
          text: "İptal",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Evet", onPress: () =>{ 
          deletePerson(genelResponse.kullaniciadi)
          navigation.navigate("Login")} }
      ]
    )
  }
}


    function handlePress(a){
      {
        Alert.alert(
          "Silmek istediğine emin misin?",
          "",
          [
            {
              text:"Evet",
              onPress:()=>{
                deletePost(a).then(()=>{
                  async function getPosts(){
                    try {
                        const response = await axios.get('http://10.0.2.2:3000/posts')
                            const data = response.data;
                            console.log(data);
                            const myPosts = data.filter(item => item.kullaniciadi === genelResponse.kullaniciadi);           
                            dispatch(setMyPosts(myPosts))  
                        } catch (error) {
                            console.error("hagszta",error);
                        }
                    };
                    getPosts()
                })
                
              }

            },
            {
              text:"Hayır",
              onPress:()=>console.log("İptal edildi")
            }
          ]
        )
      }}
      function reviews(er) {
        let reviewss={
          kullaniciadi:genelResponse.kullaniciadi,
          review:er.review+1,
          which:"review"
        }
        return reviewss
      }
    const renderItems=({item})=>(
      <TouchableOpacity onPress={()=>{
        navigation.navigate("Singlepost",{veri:item.unique})
        updatePost(item.unique,reviews(item))
      }}>

      <Card style={style.container}>
      <Text style={style.kullanici}>@{genelResponse.kullaniciadi}</Text>
      <Text style={style.text}>  {item.yazi}</Text>
      <View style={{flexDirection:"row-reverse"}}>
        <Icon.Button
        name='delete-sweep'
        onPress={() => handlePress(item.unique)}
        style={{backgroundColor:"pink"}}
        ></Icon.Button>
      <Icon.Button
      name='edit'
      onPress={()=>navigation.navigate("Updatepost",{veri:item.unique,yazi:item.yazi})}
      style={{backgroundColor:"pink"}}
      ></Icon.Button>
      
      </View>
      </Card>
      </TouchableOpacity>
    )
    const onRefresh = () => {
      async function getPosts(){
        try {
            const response = await axios.get('http://10.0.2.2:3000/posts')
                const data = response.data;
                console.log(data);
                const myPosts = data.filter(item => item.kullaniciadi === genelResponse.kullaniciadi);           
                dispatch(setMyPosts(myPosts))  
            } catch (error) {
                console.error("hata",error);
            }
        };getPosts()
        async function getPerson(){
          try {
              const response = await axios.get('http://10.0.2.2:3000/register')
                  const data = response.data;
  
                  console.log(data);
                  const myPosts = data.filter(item => item.kullaniciadi === genelResponse.kullaniciadi);           
                    setAd(myPosts[0].adi)
                    setSoyad(myPosts[0].soyadi)
                    setDg(myPosts[0].dogumgunu)
                    setTakipcisayisi(myPosts[0].followernumber)
                    setbio(myPosts[0].bio)
                    settakipedilen(Number(myPosts[0].realfollow))
              } catch (error) {
                  console.error("hathnca",error);
              }
          };
         getPerson()
    };
    const adiilk=ad.charAt(0).toUpperCase()
  const soyadiilk=soyad.charAt(0).toUpperCase()
  return (
    <View style={{flex:1}}> 
    <Card>
      <View style={{flexDirection:"row"}}>
      <View >
      {
                  image?(
                    <View>
                        <Avatar.Image size={80} source={{
                         uri:"data:image/png;base64,"+image,
                        }} />
                        </View>
                    ):(
                    <Avatar.Text size={80} label={adiilk+soyadiilk} />
                  )
                }
      </View>
      <View>
      <Text>{ad} {soyad}</Text>
      <Text>@{genelResponse.kullaniciadi}</Text>
      <Text>{dg}</Text>
      <Text>{bio}</Text>
      
      </View>
      </View>
      <View style={{flexDirection:"row-reverse"}}>

      <TouchableOpacity onPress={()=>navigation.navigate("Showfollowers")} style={{flexDirection:"row-reverse"}}>
      <Text>{takipedilen} Takip Edilenler   </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate("ShowfollowersReal")} style={{flexDirection:"row-reverse"}}>
      <Text>{takipcisayisi} Takipçi   </Text>
      </TouchableOpacity>
      </View>
    </Card>
      <SafeAreaView style={{flex:1}}>   
      <FlatList renderItem={renderItems} data={genelResponse.myposts} refreshControl={
            <RefreshControl refreshing={genelResponse.refreshing} onRefresh={onRefresh}></RefreshControl>
          }></FlatList>
      </SafeAreaView>    
      
    <PaperProvider>
      <Portal>
        <Modal style={style.modal} dismissable={true} visible={genelResponse.modalVisible} onDismiss={()=>{dispatch(settingsModal(!genelResponse.modalVisible))}} >
          <Icon.Button name="edit" onPress={()=>navigation.navigate("ProfileUpdate")}  style={style.button}>Profil Güncelle</Icon.Button>
          <Icon.Button name='person-remove' onPress={deletePersonFunction} style={style.button}>Hesabı Sil</Icon.Button>
        </Modal>
      </Portal>
    </PaperProvider>
    </View>
  )
}

const style=StyleSheet.create({
  container:{
    backgroundColor:"pink",
    marginTop:10,
    width:"90%",
    alignSelf:"center"
  },
  text:{
    fontSize:25,    
    color:"black"
  },
  kullanici:{
    fontWeight:"bold",
    fontSize:20,
  },
  button:{
    backgroundColor:"#FF6868",
    alignSelf:"center",
    color:"red",
    width:"100%",
    height:80
  },
  modal:{
    height:"100%",
    width:"100%",
    backgroundColor:"#FF6868",
    flex:1
  }
})