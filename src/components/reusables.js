import { Card } from 'react-native-paper';
import { View,Text,StyleSheet } from 'react-native';
const MyCard=(props)=>{
   
        return(
    <View>
        <Card style={style.card}>
        <Text style={style.username}>@{props.kullaniciadi}</Text>
        <Text style={style.text}>  {props.yazi}</Text>
        </Card>
    </View>)
}

export default MyCard;




const style =StyleSheet.create({
    card:{
        marginBottom:10,
        width:380,
        alignSelf:"center",
        backgroundColor:"pink"
    },
    text:{
        fontSize:20,
        marginBottom:10
    },
    username:{
        fontStyle:"italic",
        fontWeight:"bold",
        fontSize:20
    }
})