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
//router.js 中配置某个请求 -找C的方法 - next(err)

//公共成员使用放在session配置后 放在挂载路由前面
app.use((req,res,next)=>{
  app.locals.sessionUser = req.session.user;
  next();
})

app.use(router);

//在路由规则中 如果没有配置该请求
//渲染404页面
app.use((req,res,next)=>{
  res.render("404.html");
  next();
})

//统一处理错误的中间件
app.use((err,req,res,next)=>{
  res.send({
    code:500,
    msg:err.message
  })
});




//4.监听端口
app.listen(4399,()=>{
    console.log("yaho— — —")  
})