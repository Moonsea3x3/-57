//所有文章相关的方法实现
const M_topic = require("../modules/m_topic");
//渲染文件列表
exports.showTopicList =(req,res) =>{
    //客户端要视图 -> 找views 
    //数据M ->m_topic.js
    M_topic.findAllTopics((err,data)=>{
        //控制器使用模型返回的结果
        if(err){
          return res.send({
            code:500,
            msg:"服务器又错了"
          });
        }
        // console.log("取数据");
        // console.log(data);
        res.render("index.html",{
          topics:data,
          user:req.session.user
        });
    });
}  
//渲染发布文章页面
exports.showCreateTopic = (err,res) =>{
  res.render("topic/create.html")
}