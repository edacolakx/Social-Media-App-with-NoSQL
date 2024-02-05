import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { Card } from 'react-native-paper'

export default function Messagecomp(props) {
    const { genelResponse } = useSelector(state => state)

  return (
    <View>
      <Card style={props.sender==genelResponse.kullaniciadi?style.ben:style.sen}>
        <Text style={{fontSize:20}}>{props.message}</Text>
      </Card>
       
    </View>
  )
}
const style=StyleSheet.create({
  ben:{
    alignSelf:"flex-end",
    backgroundColor:"pink"
  },
  sen:{
    alignSelf:"flex-start",
    backgroundColor:"pink"
  }
})