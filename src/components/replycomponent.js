import { View, Text } from 'react-native'
import React, { useEffect ,useState} from 'react'
import { Card } from 'react-native-paper'
import { dontlike,likePost, notificationFunction } from './controller'
import Icon from 'react-native-vector-icons/MaterialIcons'
import axios from 'axios'
import { deleteReply } from './controller'
import { useSelector } from 'react-redux'

export default function Replycomponent(props) {
  const [isTrueReply,setIsTrueReply]=useState("")
  const[likesreply,setlikesreply]=useState("")
  const[replies,setReplies]=useState("")
  const {genelResponse}=useSelector(state=>state)


useEffect(()=>{
  async function abcreply() {  
    try{
            const response= await axios.get('http://10.0.2.2:3000/like/'+genelResponse.kullaniciadi+'/'+props.uniqueresponse+'/reply')
            const result=response.data
            setIsTrueReply(result.like)
          }
          catch(e){
            console.log("axios1",e)
    }
        }
      abcreply()
      async function getReplies(){
        try
        {
          const response = await axios.get('http://10.0.2.2:3000/replies')
          const dataa=response.data

          const filtered=dataa.filter(item=>item.uniqueresponse===props.uniqueresponse)
          setReplies(filtered)
         
          setlikesreply(Number(filtered[0].likes))

        }
        catch(e){
          console.log("youu",e)
        }
      }
      getReplies()
},[replies])

let data2={
  kullaniciadi:genelResponse.kullaniciadi,
  unique:props.uniqueresponse,
  which:"reply"
}
const notificationdataclike={
  kullaniciadi1:genelResponse.kullaniciadi,
  getter:props.kullaniciadi,
  which:"replylike",
  replyunique:props.uniqueresponse
}
  return (
    <View>
      <View>
    <Card style={{backgroundColor:"#C7DCA7", marginBottom:10,marginTop:10,marginLeft:10}}>
       
      <Text>{props.responseperson} kullanıcısına yanıt</Text>
      <Text>{props.kullaniciadi} </Text>
      <Text>{props.yanit}</Text>
      <View style={{flexDirection:"row-reverse"}}>

      {
        isTrueReply?(
          <Icon.Button
          name="favorite"
          onPress={()=>{
            dontlike(genelResponse.kullaniciadi,props.uniqueresponse,"reply")
            setIsTrueReply(false)
            setlikesreply(likesreply-1)
          }}
          style={{backgroundColor:"pink"}}
          >
           <Text>{Number(likesreply)}</Text>

           </Icon.Button>
        ):
        (<Icon.Button
          name="favorite-outline"
          onPress={()=>{
            likePost(data2) 
            setIsTrueReply(true)
            setlikesreply(likesreply+1)
            if (notificationdataclike.getter!=genelResponse.kullaniciadi) {
              
              notificationFunction(notificationdataclike)
            }
          }}
          style={{backgroundColor:"#C7DCA7"}}
          ><Text>{Number(likesreply)}</Text>
        </Icon.Button>)
      }
      {
        props.kullaniciadi==genelResponse.kullaniciadi?(
          <Icon.Button
        name='delete-sweep'
        onPress={() => {deleteReply(props.uniqueresponse)}}
        style={{backgroundColor:"#C7DCA7"}}
        ></Icon.Button>
          ):(null)
        }
        </View>
        </Card>
      </View>
    </View>
  )
}