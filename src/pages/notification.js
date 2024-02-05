import { View ,FlatList} from 'react-native'
import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Notificationcard from '../components/notificationcard'


export default function Notification({navigation}) {

  const [followingNotification,setFollowingNotification]=useState()
  const { genelResponse } = useSelector(state => state)



  useEffect(()=>{

    async function getNotifications() {
      try {
        const response = await axios.get('http://10.0.2.2:3000/notifications')
          const data = response.data
          const filtered=data.filter(item=>item.getter==genelResponse.kullaniciadi)

          setFollowingNotification(filtered)
        } catch (error) {
            console.error("hata",error);
        }
    }
getNotifications()
  },[followingNotification])
  const renderItem=({item})=>(
    <Notificationcard kullaniciadi1={item.kullaniciadi1} which={item.which} postunique={item.postunique} commentunique={item.commentunique} 
    replyunique={item.replyunique}  navigation={navigation}
    ></Notificationcard>
   )
  return (
    <View>
        <FlatList renderItem={renderItem} data={followingNotification}></FlatList>        
    </View>
  )
}