//1.导包
const express= require('express');
const router = require('./router');
//2.配置
const app = express();
//3.使用路由
app.use(router);
//4.监听端口
app.listen(4399,()=>{
    console.log("yaho— — —")
})