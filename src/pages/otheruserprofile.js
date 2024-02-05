import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useRoute } from '@react-navigation/native'
import { Button,Avatar } from 'react-native-paper'
import { notificationFunction, follows, increaseFollower, updateUser, sendMessage } from '../components/controller'
import {  following } from '../redux/actions'
import { deleteFollows } from '../components/controller'
import MyCard from '../components/reusables'
export default function Otheruserprofile({navigation}) {
    
    const [data, setData] = useState("")
    const [kadi, setKadi] = useState("")
    const [adi, setAdi] = useState("")
    const [soyad, setSoyad] = useState("")
    const [dg, setDg] = useState("")
    const [followernumber, setFollowernumber] = useState(0)
    const [refresh, setRefresh] = useState(0)
    const dispatch = useDispatch()
    const receivedData = useRoute().params?.veri
    const { genelResponse } = useSelector(state => state)
    const [usersPosts,setUserPosts]=useState("")
    const  [ff,setFf]=useState(false)
    const  [realfollow,setrealfollow]=useState(false)
    const[resim,setResim]=useState()


    useEffect(() => {
        async function getPostss() {
            try {
                const response = await axios.get('http://10.0.2.2:3000/register')
                const data = response.data;
                const my = data.filter(item => item.kullaniciadi === receivedData);
                setData(my[0].kullaniciadi)
                setKadi(my[0].kullaniciadi)
                setAdi(my[0].adi)
                setSoyad(my[0].soyadi)
                setDg(my[0].dogumgunu)  
                setFollowernumber(my[0].followernumber)
                setResim(my[0].resim)
            } catch (error) {
                console.error("hata", error);
            }
        };

        getPostss()
        async function getPosts() {
            try {
                const response = await axios.get('http://10.0.2.2:3000/register')
                const data = response.data;
                const my = data.filter(item => item.kullaniciadi === genelResponse.kullaniciadi);
                setrealfollow(my[0].realfollow)
            } catch (error) {
                console.error("hata", error);
            }
        };

        getPosts()

        async function isf() {
            try {
                const isFollowinga = await axios.get('http://10.0.2.2:3000/followers/' + genelResponse.kullaniciadi + '/' + receivedData)
                const isFollowingData = isFollowinga.data
                dispatch(following(isFollowingData.follows))
            } catch (e) {
                console.log("castaaway", e)
            }
        }

        isf()
        async function getUsersPosts(){
            try {
                const response = await axios.get('http://10.0.2.2:3000/posts')
                    const data = response.data;
    
                    const myPosts = data.filter(item => item.kullaniciadi === receivedData);           
                        setUserPosts(myPosts)
                } catch (error) {
                    console.error("hata",error);
                }
            };
           getUsersPosts()
    }, [])
    const followPerson = {
        kullaniciadi1: genelResponse.kullaniciadi,
        kullaniciadi2: receivedData
    }
    const followernumbers={
        followernumber:followernumber+1,
        realfollow:realfollow+1,
        kullaniciadi1:genelResponse.kullaniciadi
    }
    const decreasenumber={
        followernumber:followernumber-1,
        realfollow:realfollow-1,
        kullaniciadi1:genelResponse.kullaniciadi
    }
    const notificationdata={
        kullaniciadi1:genelResponse.kullaniciadi,
        getter:receivedData,
        which:"follow"
    }
    function followsomeone() {
        if (genelResponse.isFollowingPerson==false) {
            
            follows(followPerson)
            console.log("takip edildi")
            dispatch(following(true))
            increaseFollower(receivedData,followernumbers)
            setFollowernumber(followernumber+1)
            setrealfollow(realfollow+1)
            if (notificationdata.getter!=genelResponse.kullaniciadi) {
                
                notificationFunction(notificationdata)
            }
        }else{
            console.log("zaten takip ediliyo")
        }
    }
    function unfollowsomeone() {
        if (genelResponse.isFollowingPerson==true) {
            deleteFollows(genelResponse.kullaniciadi,receivedData)
             console.log("takipten çıktı")
            dispatch(following(false))      
            increaseFollower(receivedData,decreasenumber)
            setFollowernumber(followernumber-1) 
            setrealfollow(realfollow-1)
        } else {
            console.log("zaten takip edilmiyo")
        }
    }
    const renderItem=({item})=>(
        <MyCard yazi={item.yazi} kullaniciadi={item.kullaniciadi}></MyCard>
      )
      const messagedata={
        which:"messaged",
        sender:genelResponse.kullaniciadi,
        getter:receivedData
      }
      const messagedata2={
        which:"messaged",
        getter:genelResponse.kullaniciadi,
        sender:receivedData
      }
      const adiilk=adi.charAt(0).toUpperCase()
    const soyadiilk=soyad.charAt(0).toUpperCase()
    return (
        <View style={{ flex: 1 }}>
            <View style={{flex:1,flexDirection:"row"}}>
                <View>

            {
                resim?(
                    <View>
                        <Avatar.Image size={80} source={{
                            uri:"data:image/png;base64,"+resim,
                        }} />
                        </View>
                    ):(
                        <Avatar.Text size={80} label={adiilk+soyadiilk} />
                        )
                    }
                    </View>
                    <View>
                        
            <Text style={{fontSize:30}}>@{kadi}</Text>
            <Text>{adi} {soyad}</Text>
            <Text> {followernumber} Takipçi</Text>
            <View style={{flexDirection:"row-reverse",width:330}}>

            {
                genelResponse.isFollowingPerson?(
                    <Button onPress={()=>{
                        unfollowsomeone()
                        setFf(false)
                        dispatch(following(false))
                    }}> Takipten Çık</Button>
                    ):(
                        <Button onPress={()=>{
                            followsomeone()
                            setFf(true)
                            dispatch(following(true))
                        }}> Takip Et</Button>
                        )
                    }
            
            <Button onPress={()=>{
                
                navigation.navigate("Messagingpage",{kullaniciadi:receivedData})
                sendMessage(messagedata)
                sendMessage(messagedata2)
            }}>Mesaj at</Button>
        
        
            </View>
            </View>
        </View>
           <View style={{flex:4}}>
            <SafeAreaView>
                <FlatList renderItem={renderItem} data={usersPosts} ListHeaderComponent={<Text style={{fontSize:30}}>Gönderiler</Text>}></FlatList>
            </SafeAreaView>
            
           </View>
        </View>
    )
}