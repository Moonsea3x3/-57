//文章相关的数据
const connection = require("../config/db_config");
//查询所有文章数据
exports.findAllTopics = (callback) =>{
    const sqlstr = 'SELECT *FROM `topics`';
    connection.query(sqlstr,(err,data)=>{
        if(err){
           return callback(err);
        }
            callback(null,data);
        
    })
}
