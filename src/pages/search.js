import React, { useState,useEffect } from 'react';
import { View, FlatList, TextInput, Text,TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Button } from 'react-native-paper';
import { ShowUsers,ShowPosts } from '../components/comps';
import { useDispatch } from 'react-redux';
import { updatePost } from '../components/controller';
import { useSelector } from 'react-redux';
export default function Search ({navigation}){

  const {genelResponse}=useSelector(state=>state)

  const [users, setUsers] = useState([]); 
  const [posts, setPosts] = useState([]); 
  const [filteredData, setFilteredData] = useState([]); 
  const [get, setGet] = useState(true);
  useEffect(()=>{
    async function getUsers(){
      try {
        const response= await axios.get("http://10.0.2.2:3000/register")
        const data=response.data
        setUsers(data)
      } catch (error) {
        console.log(error)
      }
    }
  getUsers()
    async function getPosts(){
      try {
        const response= await axios.get("http://10.0.2.2:3000/posts")
        const data=response.data
        setPosts(data)
      } catch (error) {
        console.log(error)
      }
    }
  getPosts()
  },[])
  const searchFilter = (text) => {
    if (get==true) {
      const filtered = users.filter((item) => {
        return item.kullaniciadi.toLowerCase().includes(text.toLowerCase());
      });
      
      setFilteredData(filtered);
    } else {
      const filtered = posts.filter((item) => {
        return item.yazi.toLowerCase().includes(text.toLowerCase());
      });
      setFilteredData(filtered);
      
    }
  };
  function reviews(er) {
    let reviewss={
      kullaniciadi:genelResponse.kullaniciadi,
      review:er.review+1,
      which:"review"
    }
    return reviewss
  }
  return (
    <View> 
      <TextInput
        placeholder="Arama yapın..."
        onChangeText={(text) => searchFilter(text)}
      />
      

     <View style={{flexDirection:'row',justifyContent:'center'}}>
        <Button
          onPress={() => setGet(true)}
          style={{marginRight:50}}

          >
          <Text style={{fontStyle:get ?"italic":"normal",fontWeight:"bold",color:"black"}}>Kişiler</Text>
        </Button>
        <Button
          onPress={() => setGet(false)}
          style={{marginLeft:50}}
          >
          <Text style={{fontStyle:get ?"normal":"italic",fontWeight:"bold",color:"black"}}>Gönderiler</Text>
      </Button>
      </View>
      {
        get?(
        <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <View>
            {
            item.kullaniciadi==genelResponse.kullaniciadi?(
          <TouchableOpacity onPress={()=>navigation.navigate("Profile")}>
          <ShowUsers kullaniciadi={item.kullaniciadi} bio={item.bio} resim={item.resim} adi={item.adi} soyadi={item.soyadi}></ShowUsers>
          </TouchableOpacity>

              ):(

          <TouchableOpacity onPress={()=>navigation.navigate("Otheruserprofile",{veri:item.kullaniciadi})}>
          <ShowUsers kullaniciadi={item.kullaniciadi} bio={item.bio} resim={item.resim} adi={item.adi} soyadi={item.soyadi}></ShowUsers>
          </TouchableOpacity>
              )
            }
        </View>
        )}
        keyExtractor={(item) => item.unique} 
      />
      ):(
        <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <View>
          <TouchableOpacity onPress={
            ()=>{
              navigation.navigate("Singlepost",{veri:item.unique})
              updatePost(item.unique,reviews(item))
            }}>
          <ShowPosts yazi={item.yazi} kullaniciadi={item.kullaniciadi}></ShowPosts>
          </TouchableOpacity>
        </View>
        )}
        keyExtractor={(item) => item.yazi} 
      />
        )
      }
    </View>
  );
};
