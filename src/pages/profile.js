import { View, Text } from 'react-native'
import {React,useState} from 'react'
import { Button } from 'react-native-paper';
//import { getPosts } from '../components/controller';
import axios from "axios";

export default function Profile() {
    const [data,setData]=useState(null)
     async function getPosts(){
       try {
         const response = await axios.get('http://10.0.2.2:3000/posts');
         const data = response.data;
         console.log(data);
         setData(data)
       } catch (error) {
         console.error(error);
       }
      };
  return (
    <View>
      <Text>Denme</Text>
      {
        data ? (
        <View>
         {data.map((item,index)=>(
            <Text key={index}>{item.yazi}{item.baslik}</Text>
          ))}  
          </View>
        ):(
          <Text>Veri yok</Text>
        )
      }
      <Button  onPress={getPosts}>bas</Button>
    </View>
  )
}