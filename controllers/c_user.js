//演示MySQL包的使用
//1.导包
const M_user = require('../modules/m_user');

//处理客户端登录请求
exports.showSignin = (req,res,next)=>{
  res.render("signin.html");
};
exports.handleSignin = (req,res,next)=>{
    //1.获取表单数据req.body
    const body = req.body;
    console.log(body);
    //使用m_user中的方法
    //在这个位置使用数据库操作的结果(err,data)
  M_user.checkEmail(body.email, 
    (err,data)=>{
      if(err){
       return next(err);
      };
      //data数组 如果邮箱不存在
      if(data.length === 0){
        // console.log("邮箱不存在");
        return res.send({
          code:1,
          msg:"邮箱不存在"
        }); 
      };
       //3.验证密码
      // console.log(data);
      if(data[0].password !== body.password){
        return res.send({
          code:2,
          msg:"密码不正确"
        });
      };
      //data[0] 包括昵称(用户名)
      //使用req.session保存正确的用户信息
      req.session.user = data[0];
      // console.log("存数据");
      // console.log(req.session.user);
     //4.返回200
       res.send({
          code:200,
          msg:"可以登录"
     });
   })
  };
  
  
  
  //处理用户退出的请求
  exports.handleSignout = (req,res,next) =>{
    //1.清除session中的user信息
    delete req.session.user;
    //2.回到登录页
    res.redirect("/signin");
  }

  //渲染注册页面
  exports.showSignup = (req,res,next)=>{
    res.render("signup.html");
  }

exports.handleSignup =(req,res,next)=>{
  //1.获取表单数据
  const body = req.body;

  //2.先验证邮箱是否存在(body.email ===数据库)
  //如果存在 返回响应
  M_user.checkEmail(body.email,(err,data)=>{
    if(err){
      return next(err);
    }
    if(data[0]){
      return res.send({
        code:1,
        msg:"邮箱存在"
      });
    }
    //3.如果邮箱不存在 ->验证昵称
    //如果存在 返回响应
    M_user.checkNickname(body.nickname,(err,data)=>{
      if(err){
        return next(err);
      }
      if(data[0]){
        return res.send({
          code:2,
          msg:"昵称存在"
        })
      }
      //4.如果昵称不存在 - 可以添加新用户
      M_user.addUser(body,(err,data)=>{
        if(err){
         return next(err);
        }
        //5.返回200响应
        res.send({
          code:200,
          msg:"添加成功"
        })
      })
    });
  });
}