import { View, Text ,StyleSheet, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import {Card ,Avatar } from 'react-native-paper'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { dontlike, likePost, updatePost ,notificationFunction} from './controller'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default function Homepageposts(props) {
    
    const {genelResponse}=useSelector(state=>state)
    const [isTrue,setIsTrue]=useState("")
    const[liste,setListe]=useState([])
    const[adi,setAdi]=useState("")
    const[soyadi,setsoyAdi]=useState("")
    const[resim,setResim]=useState("")
   
    useEffect(()=>{
        async function abc() {  
        try{
                const response= await axios.get('http://10.0.2.2:3000/like/'+genelResponse.kullaniciadi+'/'+props.unique+'/post')
                const result=response.data
                setIsTrue(result.like)
              }
              catch(e){
                console.log(e)
        }
            }
          abc()
        async function getPosts() {  
        try{
                const response= await axios.get('http://10.0.2.2:3000/register')
                const result=response.data
                const filtered=result.filter(item=>item.kullaniciadi==props.kullaniciadi)
                setAdi(filtered[0].adi)
                setsoyAdi(filtered[0].soyadi)
                setResim(filtered[0].resim)
                }
              catch(e){
                console.log(e)
        }
            }
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
                }
                catch(e){
                    console.log(e)
                }
           }
           getFollowersPosts()
           setCounterlikes(props.likes)
    },[review,liste])
    
        let data={
          kullaniciadi:genelResponse.kullaniciadi,
          unique:props.unique,
          which:"post"
        }
        let review={
          kullaniciadi:genelResponse.kullaniciadi,
          review:props.review+1,
          which:"review"
        }
        const[counterlikes,setCounterlikes]=useState(0)

        const notificationdata={
          kullaniciadi1:genelResponse.kullaniciadi,
          getter:props.kullaniciadi,
          which:"postlike",
          postunique:props.unique
        }
        const adiilk=adi.charAt(0).toUpperCase()
        const soyadiilk=soyadi.charAt(0).toUpperCase()
        const [boyut, setBoyut] = useState({ width: 0, height: 0 });

        const handleLayout = (event) => {
          const { width, height } = event.nativeEvent.layout;
          setBoyut({ width, height });
        }
  return (
      <Card style={style.card}>
        <View style={{flexDirection:"row"}}>

        <View>

                  {
                    resim?(
                      <Avatar.Image size={60} source={{
                        uri:"data:image/png;base64,"+resim,
                        
                      }} />
                      ):(
                        <Avatar.Text size={60} label={adiilk+soyadiilk} />
                        )
                      }
                      </View>
                    <View>
                    <View style={{marginLeft:8}}>

      <TouchableOpacity onPress={()=>{
        props.navigation.navigate("Otheruserprofile",{veri:props.kullaniciadi})
      }}>

      <Text>@{props.kullaniciadi}</Text>
      </TouchableOpacity>
      
      <Text>{props.yazi}</Text>
        </View>
      <View style={{flexDirection:"row-reverse",width:340}}>

          {
            isTrue?(
              <Icon.Button
              name="favorite"
              onPress={()=>{
                dontlike(genelResponse.kullaniciadi,props.unique)
                setIsTrue(false)
                setCounterlikes(counterlikes-1)
              }}
              style={{backgroundColor:"#FFC5C5"}}
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
                if (notificationdata.getter!=genelResponse.kullaniciadi) {
                  
                  notificationFunction(notificationdata)
                }
              }}
              style={{backgroundColor:"#FFC5C5"}}
              ><Text>{Number(counterlikes)}</Text>
            </Icon.Button>)
          }
          <Icon.Button name='chat-bubble-outline' onPress={()=>{
            props.navigation.navigate("Singlepost",{veri:props.unique})
            updatePost(props.unique,review)
          }} style={{backgroundColor:"#FFC5C5"}}></Icon.Button>
          </View>
          </View>
          </View>
          </Card>
  )
}
const style=StyleSheet.create({
  card:{
    backgroundColor:"#FFC5C5",
    marginBottom:10,
    width:"auto",
    flexDirection:"row",
  }
})