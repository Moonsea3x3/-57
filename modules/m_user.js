//作用:把c_user文件中的"数据库操作部分"提取出来
//导入数据库配置模块
const connection = require("../config/db_config");
exports.checkEmail = (email,callback) =>{
    const sqlstr = 'SELECT *FROM `users` WHERE email=?';
    connection.query(sqlstr,email,(err,data)=>{
      if(err){
        //err结果
        callback(err,null);
      }else{
        // data结果
        callback(null,data);
      }
    });  
  }
//验证昵称
//方法中使用数据 该数据来源可以为 
//1.可以在方法外部声明
//2.可以在该函数调用时传实参
exports.checkNickname =(nickname,callback)=>{
  const sqlstr = 'SELECT *FROM `users` WHERE nickname=?';
  connection.query(sqlstr,nickname,(err,data)=>{
    if(err){
      return callback(err,null);
    }
      callback(null,data);
    
  });
};

//添加新用户
exports.addUser =(body,callback)=>{
  const sqlstr = 'INSERT INTO `users` SET ?';
  connection.query(sqlstr,body,(err,data)=>{
    if(err){
      return callback(err,null);
    }
    callback(null,data);
  })
}