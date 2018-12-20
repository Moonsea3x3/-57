//配置mysql包
const mysql = require('mysql');

//2.配置数据库信息
const connection = mysql.createConnection({
  //主机名
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  //数据库名字
  database : 'nodejs57'
});
//3.连接数据库
connection.connect();

module.exports = connection; 