import { View ,StyleSheet,ScrollView,ToastAndroid} from 'react-native'
import {React,useState,useEffect} from 'react'
import { updateUser } from '../components/controller'
import { Button ,TextInput} from "react-native-paper";
import { useDispatch,useSelector ,connect} from 'react-redux'
import axios from 'axios';
import { launchImageLibrary} from 'react-native-image-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker"

export default function Profileupdate({navigation}) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    
  const {genelResponse}=useSelector(state=>state)
  const [name,setName]=useState("")
    const [surname,setSurname]=useState("")
    const [email,setEmail]=useState("")
    const [phone,setPhone]=useState("")
    const [username,setUsername]=useState("")
    const [birthday,setBirthday]=useState("")
    const [password,setPassword]=useState("")
    const [bio,setbio]=useState("")
    const [image,setImage]=useState("")
  dispatch=useDispatch()
  useEffect(()=>{
    async function getPosts(){
        try {
            const response = await axios.get('http://10.0.2.2:3000/register')
                const data = response.data;

                console.log( "kızım bak benden var btiane",data);
                const users = data.filter(item => item.kullaniciadi === genelResponse.kullaniciadi);           
               setName(users[0].adi)
               setSurname(users[0].soyadi)
               setEmail(users[0].email)
               setPhone(users[0].telefon)
               setUsername(users[0].kullaniciadi)
               setBirthday(users[0].dogumgunu)
               setPassword(users[0].sifre)
               setbio(users[0].bio)
               setImage(users[0].resim)
                console.log(users[0].kullaniciadi)
                console.log(users[0].adi)
                console.log(users[0].email)
                console.log(users[0].telefon)
                console.log(users[0].soyadi)
            } catch (error) {
                console.error("hata",error);
            }
        };
       getPosts()
    },[dispatch])
      
      function onName(tex){
        setName(tex)
     }
     function onSurname(tex){
        setSurname(tex)
     }
     function onEmail(tex){
        setEmail(tex)
     }
     function onPhone(tex){
         setPhone(tex)
     }
     function onUsername(tex){
         setUsername(tex)
     }
     
     function onPassword(tex){
         setPassword(tex)
       }
     function onbio(tex){
         setbio(tex)
       }
       const handleConfirm = (date) => {
        const justDate = date.toISOString().split('T')[0];
        console.log("A date has been picked: ", justDate);
        setBirthday(justDate)
        hideDatePicker();
      }

       const updatedUser={
        adi:name,
        soyadi:surname,
        email:email,
        telefon:phone,
        kullaniciadi:username,
        dogumgunu:birthday,
        sifre:password,
        bio:bio,
        resim:image
       }
       const showToastWithGravity = () => {
        ToastAndroid.showWithGravity(
          'Başarıyla Güncellendi',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      };
       function pressButton(){
        
        updateUser(updatedUser)
        console.log('Güncelledi',updatedUser)
        showToastWithGravity()
        navigation.navigate("Home")
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
  return (
    <View>
      <ScrollView>
      <TextInput style={styles.input} mode='outlined' label={"isim"} onChangeText={onName}  placeholder={name}></TextInput>
      <TextInput style={styles.input} mode='outlined' label={"soyisim"}onChangeText={onSurname}  placeholder={surname}></TextInput>
      <TextInput style={styles.input} mode='outlined' label={"email"}onChangeText={onEmail}placeholder={email}></TextInput>
      <TextInput style={styles.input} mode='outlined' label={"telefon"}onChangeText={onPhone} placeholder={phone}></TextInput>
      <TextInput style={styles.input} mode='outlined' label={"kullanıcıadı"}onChangeText={onUsername}placeholder={username}></TextInput>
      <TextInput style={styles.input} mode='outlined' label={"şifre"}onChangeText={onPassword} placeholder={password}></TextInput>
      <TextInput style={styles.input} mode='outlined' label={"bio"}onChangeText={onbio} placeholder={bio}></TextInput>
      <Button title="Show Date Picker" onPress={() => {
        setDatePickerVisibility(true);
      }} >Doğum Gününü Değiştir</Button>
      <Button  onPress={() => {
        resim()
      }} >Yeni Resim Seç</Button>
       <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        display='spinner'
        onConfirm={handleConfirm}
        onCancel={() => {
          setDatePickerVisibility(false);
        }}
      />
        <Button onPress={pressButton}> Güncelle</Button>
      </ScrollView>
    </View>
  )
}

const styles=StyleSheet.create({
    input:{
        backgroundColor:"#A25772",
        width:350,
        alignSelf:"center",
        marginBottom:20,
        marginTop:20,
        borderRadius:15,
        borderRadius:20
    }
})