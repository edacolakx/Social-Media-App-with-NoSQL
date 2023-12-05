import axios from "axios";
import {React,useState} from "react";
export async function createNewUser  (userInfo){
    try {
      const response = await axios.post('http://10.0.2.2:3000/register', userInfo);
      console.log('Yeni kullanıcı eklendi:', response.data);
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  export async function createNewPost  (post){
    try {
      const response = await axios.post('http://10.0.2.2:3000/posts', post);
      console.log('Yeni post eklendi:', response.data);
    } catch (error) {
      console.error('Hata:', error);
    }
  };

