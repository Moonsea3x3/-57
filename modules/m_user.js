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