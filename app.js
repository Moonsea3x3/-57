//1.导包
const express= require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const session = require('express-session');
//2.配置
const app = express();
//配置静态资源
app.use("/public",express.static("./public"));
//配置第三方资源
app.use("/node_modules",express.static("./node_modules"));
app.engine('html', require('express-art-template'));
app.use(bodyParser.urlencoded({ 
    extended: false 
}))
app.use(bodyParser.json())
//配置express-session
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))
//3.使用路由
app.use(router);
//4.监听端口
app.listen(4399,()=>{
    console.log("yaho— — —")  
})