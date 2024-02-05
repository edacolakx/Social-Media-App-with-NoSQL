import { View, Text , StyleSheet, Alert} from 'react-native'
import { Button, Card,Avatar } from 'react-native-paper'
import React from 'react'
import {  useSelector } from 'react-redux'
import { deletePost } from './controller'
import { deletePerson } from './controller'
export function ShowUsers(props) {

 const adiilk=props.adi.charAt(0).toUpperCase()
 const soyadiilk=props.soyadi.charAt(0).toUpperCase()
  return (
    <View>

            <Card style={style.card}>
              <View style={{flexDirection:"row"}}>
              <View>
                {
                  props.resim?(
                    <View>
                        <Avatar.Image size={50} source={{
                         uri:"data:image/png;base64,"+props.resim,
                        }} />
                        </View>
                    ):(
                    <Avatar.Text size={50} label={adiilk+soyadiilk} />
                  )
                }
              </View>
              <View>

                <Text>@{props.kullaniciadi}</Text>
                <Text>{props.bio}</Text>
              </View>
              </View>
            </Card>

    </View>
  )
}
export function ShowPosts(props) {
  return (
    <View>

            <Card style={style.card}>
                <Text>{props.kullaniciadi}</Text>
                <Text>{props.yazi}</Text>
            </Card>

    </View>
  )
}

export function EditPosts(props) {
  const {genelResponse}=useSelector(state=>state)
  
  const unique=props.unique

  function handlePress(){
{
  Alert.alert(
    "Silmek istediğine emin misin?",
    "",
    [
      {
        text:"Evet",
        onPress:()=>deletePost(unique)
      },
      {
        text:"Hayır",
        onPress:()=>console.log("İptal edildi")
      }
    ]
  )
}

    
  }
  return(
    <View >
      <Card style={style.container}>
      <Text style={style.kullanici}>@{props.kullaniciadi}</Text>
      <Text style={style.text}>{props.yazi}</Text>
      <Button onPress={handlePress()}>Sil</Button>
      <Button onPress={null}>Düzenle</Button>
      </Card>
    </View>
  
  )
}

export function deletePersonFunction() {
  const {genelResponse}=useSelector(state=>state)

  deletePerson(genelResponse.kullaniciadi)
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
        { text: "Evet", onPress: () => navigation.navigate("Login") }
      ]
    )
  }
}

const style=StyleSheet.create({
  container:{
    width:"100%",
    backgroundColor:"pink",
    marginTop:10
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
    
  },
  card:{
    backgroundColor:"pink",
    marginBottom:10
  }
})