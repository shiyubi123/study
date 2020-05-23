import axios from 'axios'



const api = axios.create({
    //为什么不能localhost:以地址栏的地址跨域，当为localhost的时候，无法确定具体的域
    // withCredentials:true,
    baseURL:'/api',
})

export default api