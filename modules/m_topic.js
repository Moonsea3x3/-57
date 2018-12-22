//文章相关的数据
const connection = require("../config/db_config");
//查询所有文章数据
exports.findAllTopics = callback => {
  const sqlstr = "SELECT *FROM `topics` ORDER BY id DESC";
  connection.query(sqlstr, (err, data) => {
    if (err) {
      return callback(err);
    }
    callback(null, data);
  });
};
//添加新文章
exports.addTopic = (body,callback) => {
  const sqlstr = "INSERT INTO `topics` SET ?";
  connection.query(sqlstr, body, (err, data) => {
    if (err) {
      return callback(err);
    }
    callback(null, data);
  });
};
//根据id查询文章
exports.findTopicById = (topicID,callback) =>{
  const sqlstr = 'SELECT *FROM `topics` WHERE id = ?';
  connection.query(sqlstr,topicID,(err,data)=>{
    if(err){
      return callback(err,null);
    }
    callback(null,data);
  })
};

//在异步函数操作有结果的位置 通过调用函数的方式 传递结果

//根据topicID删除文章
exports.deleTopicById = (topicID,callback)=>{
  const sqlstr = 'DELETE FROM `topics`WHERE id =?';
  connection.query(sqlstr,topicID,(err,data) => {
    if (err) {
      return callback(err,null);
    }
    callback(null,data);
  })
}

//编辑文章(修改文章 根据id)
exports.editTopicById = (topicID,body,callback)=>{
  const sqlstr = 'UPDATE `topics` SET ? WHERE id=?';
  connection.query(sqlstr,[body,topicID],(err,data)=>{
    if(err){
      return callback(err,null);
    }
    callback(null,data);
  }) 
}
