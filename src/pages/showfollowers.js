import { View, Text,FlatList ,ScrollView, SafeAreaView} from 'react-native'
import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { useSelector,useDispatch } from 'react-redux'
import MyCard from '../components/reusables'

export default function Showfollowers() {
    const {genelResponse}=useSelector(state=>state)
    const [data,setData]=useState("")
    dispatch=useDispatch()

    useEffect(()=>{
       async function getFollowers() {
            try
            {
                const response= await axios.get('http://10.0.2.2:3000/register/'+genelResponse.kullaniciadi+"/following")
                const data=response.data
                setData(data)
                console.log("takip edilenler",data)
            }
            catch(e){
                console.log(e)
            }
        }
        getFollowers()
    },[dispatch])

    const renderItem=({item})=>
        
(           <MyCard kullaniciadi={item.kullaniciadi}></MyCard>)
        
    
  return (
    <View style={{flex:1,borderWidth:8}}>
      <SafeAreaView >
        <FlatList renderItem={renderItem} data={data}></FlatList>
      </SafeAreaView>
    </View>
  )
}