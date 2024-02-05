import { View, Text,StyleSheet ,TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Card,Avatar ,Paragraph} from 'react-native-paper'
import axios from 'axios'

export default function Notificationcard(props) {
    const[resim,setResim]=useState("")
    const[adi,setadi]=useState("")
    const[soyadi,setsoyadi]=useState("")
    const[yazia,setyazi]=useState("")
    const[yoruma,setyorum]=useState("")
    useEffect(()=>{
       async function getPosts() {
            const response= await axios.get('http://10.0.2.2:3000/posts')
            const result=response.data
            const data=result.filter(item=>item.unique==props.postunique)
            setyazi(data[0].yazi)
        }
        getPosts()
       async function getPerson() {
            const response= await axios.get('http://10.0.2.2:3000/register')
            const result=response.data
            const data=result.filter(item=>item.kullaniciadi==props.kullaniciadi1)
            setResim(data[0].resim)
            setadi(data[0].adi)
            setsoyadi(data[0].soyadi)
        }
        getPerson()
       async function getComments() {
        try{

            const response= await axios.get('http://10.0.2.2:3000/comments')
            const result=response.data
            const data=result.filter(item=>item.uniquecomment==props.commentunique)
            setyorum(data[0].yorum)
            console.log(data[0].yorum)
        }catch(e){
            console.log(e)
        }
        }
        getComments()
       async function getReplies() {
        try{

            const response= await axios.get('http://10.0.2.2:3000/replies')
            const result=response.data
            const data=result.filter(item=>item.uniqueresponse==props.replyunique)
            setyanita(data[0].yanit)
        }catch(e){
            console.log(e)
        }
        }
        getReplies()
    },[adi])

    const adiilk=adi.charAt(0).toUpperCase()
    const soyadiilk=soyadi.charAt(0).toUpperCase()
  return (
    <View>
        {
            props.which=="follow"?(

      <Card style={styles.card}>
        <View style={{flexDirection:"row"}}>

                    {
                        resim?(
                            <View>
                        <Avatar.Image size={40} source={{
                            uri:"data:image/png;base64,"+resim,
                        }} />
                        </View>
                    ):(
                        <Avatar.Text size={40} label={adiilk+soyadiilk} />
                        )
                    }
                    <TouchableOpacity onPress={()=>props.navigation.navigate("Otheruserprofile",{veri:props.kullaniciadi1})}>
                        <Text>{props.kullaniciadi1} seni takip etmeye başladı.</Text>
                    </TouchableOpacity>
                    </View>
      </Card>
            ):(props.which=="postlike"?(
                <Card style={styles.card}>
                      <Text>{props.kullaniciadi1} postunu beğendi</Text>
                      <TouchableOpacity onPress={()=>{
                         props.navigation.navigate("Singlepost",{veri:props.postunique})
                      }}>
                      <Card elevation={5}>
                      <Card.Content>
                         <Paragraph numberOfLines={2}>{yazia}</Paragraph>
                         </Card.Content>
                      </Card>
                      </TouchableOpacity>
                </Card>
            ):(
                props.which=="comment"?(
                <Card style={styles.card}>
                    <Text>{props.kullaniciadi1} kullanıcısı bir postuna yorum yaptı</Text>
                      <TouchableOpacity onPress={()=>{
                         props.navigation.navigate("Singlepost",{veri:props.postunique})
                      }}>
                      <Card elevation={5}>
                      <Card.Content>
                         <Paragraph numberOfLines={2}>{yazia}</Paragraph>
                         </Card.Content>
                      </Card>
                      </TouchableOpacity>
                </Card>
                ):(
                    props.which=="reply"?(
                <Card style={styles.card}>

                      <Text>{props.kullaniciadi1}kullanıcısı  yorumuna yanıt verdi</Text>
                      <TouchableOpacity onPress={()=>{
                         props.navigation.navigate("Singlepost",{veri:props.postunique})
                      }}>
                      <Card elevation={5}>
                      <Card.Content>
                         <Paragraph numberOfLines={2}>{yoruma}</Paragraph>
                         </Card.Content>
                      </Card>
                      </TouchableOpacity>
                </Card>
                    ):(
                        props.which=="commentlike"?(
                            <Card style={styles.card}>
                          <Text>{props.kullaniciadi1}kullanıcısı  {props.commentunique} yorumunu beğendi</Text>
                    </Card>
                        ):(
                            props.which=="replylike"?(
                                <Card style={styles.card}>
                              <Text>{props.kullaniciadi1}kullanıcısı  {props.replyunique} yanıtını beğendi</Text>
                        </Card>
                            ):(
                                props.which=="postreply"?(
                            <Card style={styles.card}>
                                <Text>{props.kullaniciadi1} kullanıcısı postuna  yanıt verdi</Text>
                                <TouchableOpacity onPress={()=>{
                         props.navigation.navigate("Singlepost",{veri:props.postunique})
                      }}>
                      <Card elevation={5}>
                      <Card.Content>
                         <Paragraph numberOfLines={2}>{yazia}</Paragraph>
                         </Card.Content>
                      </Card>
                      </TouchableOpacity>
                            </Card>
                                ):(
                                    null
                                )
                            )
                        )
                    )
                )
            )

      
            )
        }
    </View>
  )
}

const styles=StyleSheet.create({
    card:{
        marginBottom:10,
        backgroundColor:"pink"
    }
})