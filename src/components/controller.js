import axios from "axios";
import {React,useState} from "react";
import { useDispatch,useSelector ,connect} from 'react-redux'
import { refreshPosts,setPosts } from '../redux/actions'

export async function createNewUser  (userInfo){
    try {
      const response = await axios.post('http://10.0.2.2:3000/register', userInfo);
      console.log('Yeni kullanıcı eklendi:', response.data);
    } catch (error) {
      console.error('Hata:', error.response.data);
    }
  };

  export async function createNewPost  (post){
    try {
      const response = await axios.post('http://10.0.2.2:3000/posts', post);
      console.log('Yeni post eklendi:', response.data);
    } catch (error) {
      console.error('Hataaaaa:', error.response.data);
    }
  };
  
  export async function createNewComment  (post){
    try {
      const response = await axios.post('http://10.0.2.2:3000/comments', post);
      console.log('Yeni comment eklendi:', response.data);
    } catch (error) {
      console.error('Hataaaaadca:', error);
    }
  };

  export async function createNewReply  (post){
    try {
      const response = await axios.post('http://10.0.2.2:3000/replies', post);
      console.log('Yeni yanıt eklendi:', response.data);
    } catch (error) {
      console.error('Hataaaaa:', error.response.data);
    }
  };
  export async function updateUser(user){
    try {
      const response=await axios.put('http://10.0.2.2:3000/register',user)
      console.log('Kullanıcı güncellendi',response.data)
    } catch (error) {
      console.log('Kullanıcı güncellenemedi',error)
    }
  }
  export async function updatePost(user,post){
    try {
      const response=await axios.put('http://10.0.2.2:3000/posts/'+user,post)
      console.log('Kullanıcı güncellendi',response.data)
    } catch (error) {
      console.log('Kullanıcı güncellenemedi',error)
    }
  }
  export async function updateComment(user,post){
    try {
      const response=await axios.put('http://10.0.2.2:3000/comments/'+user,post)
      console.log('yorum güncellendi',response.data)
    } catch (error) {
      console.log('yorum güncellenemedi',error)
    }
  }
  export async function increaseFollower(user,followernumber){
    try {
      console.log(user,followernumber)
      const response=await axios.put('http://10.0.2.2:3000/register/'+user,followernumber)
      console.log('Takipçi arttı',response.data)
    } catch (error) {
      console.log('Takipçi artmadı',error)
    }
  }

  export async function posts(){
      try {
          const response =  axios.get('http://10.0.2.2:3000/posts')
              const data = response.data;
              console.log(data);
              useDispatch(setPosts(data));             
          } catch (error) {
              console.error("hata",error);
          }
          return data
      };

  export async function deletePerson(user){
    try{
      console.log(user)
      const response= await axios.delete('http://10.0.2.2:3000/register/'+user)
      
      console.log(response.data)
      console.log('Kullanıcı silindi')
    }catch(e){
      console.log('Kullanıcı silinemedi',e)
    }
    
  }
  export async function follows  (post){
    try {
      const response = await axios.post('http://10.0.2.2:3000/followers', post);
      console.log('takip edildi:', response.data);
    } catch (error) {
      console.error('takip edilmedi:', error.response.data);
    }
  };
 
  export async function likePost  (post){
    try {
      const response = await axios.post('http://10.0.2.2:3000/like', post);
      console.log('takip edildi:', response.data);
    } catch (error) {
      console.error('takip edilmedi:', error.response.data);
    }
  };
  export async function notificationFunction  (post){
    try {
      const response = await axios.post('http://10.0.2.2:3000/notifications', post);
      console.log('bildirim', response.data);
    } catch (error) {
      console.error('bildirim', error.response.data);
    }
  };
 
  export async function getUserList(){
    try {
        const response =  axios.get('http://10.0.2.2:3000/register')
            const data = response.data;
            console.log(data);
        } catch (error) {
            console.error("hata",error);
        }
        return data
    };

    export async function deleteFollows(kullaniciadi1,kullaniciadi2){
      try{
        
        const response= await axios.delete('http://10.0.2.2:3000/followers/'+kullaniciadi1+'/'+kullaniciadi2)
        
        console.log(response.data)
        console.log('Kullanıcı silindi')
      }catch(e){
        console.log('Kullanıcı silinemedi',e)
      }
      
    }
    export async function dontlike(kullaniciadi,unique,which){
      try{
        
        const response= await axios.delete('http://10.0.2.2:3000/like/'+kullaniciadi+"/"+unique+'/'+which)
        
        console.log(response.data)
        console.log('Kullanıcı silindi')
      }catch(e){
        console.log('Kullanıcı silinemedi',e)
      }
      
    }

    export async function getEverything(){
      try {
        const response= axios.get("http://10.0.2.2:3000")
        const data=response.data
        console.log(data)
        return data
      } catch (error) {
        console.log(error)
      }
    }

    export async function deletePost(post){
      try{
        console.log(post)
        const response= await axios.delete('http://10.0.2.2:3000/posts/'+post)
        
        console.log(response.data)
        console.log('Kullanıcı silindi')
      }catch(e){
        console.log('Kullanıcı silinemedi',e)
      }
      
    }
    export async function deleteReply(post){
      try{
        console.log(post)
        const response= await axios.delete('http://10.0.2.2:3000/replies/'+post)
        
        console.log(response.data)
        console.log('Kullanıcı silindi')
      }catch(e){
        console.log('Kullanıcı silinemedi',e)
      }
      
    }
    export async function deleteComment(post){
      try{
        console.log(post)
        const response= await axios.delete('http://10.0.2.2:3000/comments/'+post)
        
        console.log(response.data)
        console.log('Kullanıcı silindi')
      }catch(e){
        console.log('Kullanıcı silinemedi',e)
      }
      
    }

    export async function sendMessage  (post){
      try {
        const response = await axios.post('http://10.0.2.2:3000/message', post);
        console.log('mesaj atıldı', response.data);
      } catch (error) {
        console.error('mesaj atılmadı', error.response.data);
      }
    };
   