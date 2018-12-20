//1.导包
const express= require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'nodejs57'
};
const sessionStore = new MySQLStore(options);
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
//配置express-mysql-session
  app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  }));
//3.使用路由
app.use(router);
//4.监听端口
app.listen(4399,()=>{
    console.log("yaho— — —")  
})