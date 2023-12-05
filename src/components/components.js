import { View, Text, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import neo4j from 'neo4j-driver';
import axios from 'axios';

const Denme = () => {

const [data,setData]=useState(null)

async function getUsers(){
 try {
   const response = await axios.get('http://10.0.2.2:3000/users');
   const data = response.data;
   console.log(data); // Alınan kullanıcı verileri
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
            <Text key={index}>{item.adi}</Text>
          ))}  
          </View>
        ):(
          <Text>Veri yok</Text>
        )
      }
      <Button title='bas' onPress={getUsers}></Button>
    </View>
  );
};

export default Denme;
