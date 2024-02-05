import { View, Text ,StyleSheet,Alert} from 'react-native'
import React, { useState } from 'react'
import { TextInput ,Button,Avatar} from 'react-native-paper'
import { useRoute } from '@react-navigation/native'
import { createNewUser } from '../../components/controller'
import DateTimePickerModal from "react-native-modal-datetime-picker"
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons'

export default function Second({navigation}) {
    const email=useRoute().params?.email
    const password=useRoute().params?.password
    const username=useRoute().params?.username
    const [name,setName]=useState("")
    const [surname,setSurname]=useState("")
    const [phone,setPhone]=useState("")
    const [birthday,setBirthday]=useState("")
    const [bio,setBio]=useState("")
    const [image,setImage]=useState("")
    const [isselected,setisselected]=useState(false)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const handleConfirm = (date) => {
      const justDate = date.toISOString().split('T')[0];
      console.log("A date has been picked: ", justDate);
      setBirthday(justDate)
      setisselected(true)
      hideDatePicker();
    }
    console.log(email)
    function onName(tex){
        setName(tex)
     }
     function onSurname(tex){
        setSurname(tex)
     }
     function onPhone(tex){
        setPhone(tex)
    }
    function onBirthday(tex){
        setBirthday(tex)
   }
    function onBio(tex){
        setBio(tex)
   }
   const resim=()=>{
    let options={
        storageOptions:{
            path:"image",    
        },
        includeBase64:true
    }

    launchImageLibrary(options,res=>{
        makas=JSON.stringify(res)
        parsedData=JSON.parse(makas)
        fileName=parsedData.assets[0].base64
        fileName=String(fileName)
        console.log(fileName)
        setImage(fileName)
    })
}
   const userInfo = {
    adi: name,   
    soyadi:surname,
    email:email,
    telefon:phone,
    kullaniciadi:username,
    dogumgunu:birthday,
    sifre:password,
    bio:bio,
    resim:image
};
   function press() {
    if (name=="" && surname=="" && phone=="" &&birthday=="") {
        {
            Alert.alert(
                'Hata!',
                'Lütfen tüm alanları doldurunuz.',
                [
                  {
                    text: 'Tamam',
                  },
                ],
             
              );
        }
    }else{
       createNewUser(userInfo) 
       {
        Alert.alert(
            'Merhaba '+name+' '+surname+'!',
            'Hesabın başarıyla oluşturuldu.',
            [
              {
                text: 'Tamam',
                onPress:()=>navigation.navigate("Login")
              },
            ],
         
          );
    }
    }
   }
  
  return (
    <View>
      <TextInput style={styles.input} onChangeText={onName} placeholder='Adınızı giriniz' mode='flat'
            label={"Adı"}></TextInput>
      <TextInput style={styles.input} onChangeText={onSurname} placeholder='Soyadınızı giriniz' mode='flat'
            label={"Soyadı"}></TextInput>
             <TextInput style={styles.input} onChangeText={onPhone} placeholder='Telefon giriniz'mode='flat'
            label={"Telefon"}></TextInput>
            <TextInput style={styles.input} onChangeText={onBio} placeholder='Bio giriniz'mode='flat'
            label={"Bio"}></TextInput>
         
          <View style={{flexDirection:"row",alignSelf:"center",width:"80%",justifyContent:"space-between"}}>
              <Icon.Button
              name="calendar-today"
              onPress={()=>{
                setDatePickerVisibility(true);
              }}
              style={{backgroundColor:"#FF7676",height:60}}
              >
            </Icon.Button>
              {
        isselected?(
          <Text>{birthday}</Text>
        ):(null)
      }
      <View></View>
              <Icon.Button
              name="insert-photo"
              onPress={()=>{
                resim()
              }}
              style={{backgroundColor:"#FF7676",height:60}}
              >
            </Icon.Button>
            {
                    image?(
                        <Avatar.Image size={60} source={{
                          uri:"data:image/png;base64,"+image,
                          
                        }} />
                    ):(
                      <Avatar.Image size={60} source={
                        require('nosql/src/assets/indir.jpeg')
                      } />
                      )
                    }
</View>
       <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        display='spinner'
        onConfirm={handleConfirm}
        onCancel={() => {
          setDatePickerVisibility(false);
        }}
      />
      
      
                  <Button  onPress={press} >KAYIT OL</Button>

    </View>
  )
}const styles=StyleSheet.create({
    input:{
        backgroundColor:"pink",
        width:350,
        alignSelf:"center",
        marginBottom:20,
        marginTop:20,
        borderRadius:15
    }
})