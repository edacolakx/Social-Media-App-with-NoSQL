import axios from 'axios';

const [data,setData]=useState(null)

async function getUsers(){
 try {
   const response = await axios.get('http://10.0.2.2:3000');
   const data = response.data;
   console.log(data); // Alınan kullanıcı verileri
   setData(data)
 } catch (error) {
   console.error(error);
 }
};

const createNewUser = async (userInfo) => {
  try {
    const response = await axios.post('http://10.0.2.2:3000', userInfo);
    console.log('Yeni kullanıcı eklendi:', response.data);
  } catch (error) {
    console.error('Hata:', error);
  }
};

export default {getUsers,createNewUser} ;

