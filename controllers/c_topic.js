//所有文章相关的方法实现
const moment = require('moment');
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
exports.showCreateTopic = (req,res) =>{
  res.render("topic/create.html")
}

//处理发布新文章的请求
exports.handleCreateTopic = (req,res) =>{
  //1.获取表单数据req.body()
  const body = req.body;
  //给body添加成员 
  body.createdAt = moment().format();
  //userId(当前添加的新文章的创建者是谁) 文章的userId = 当前登录用户的id值
  body.userId = req.session.user.id;
  //2.让模型去操作数据库-> 添加/插入数据  并且返回结果
  M_topic.addTopic(body,(err,data)=>{
    if(err){
      return res.send({
        code:500,
        msg:"服务器错误"
      });
    };
    //3.使用该结果
    res.send({
      code:200,
      msg:"添加成功"
    })
  }) 
}
//渲染文章详情
exports.showTopicDetail = (req,res) =>{
  //获取当前动态路由参数topicID的值
  // console.log(req.params);      //{topicID:'8'}
  const topicID = req.params.topicID;
  // console.log(topicID);
  //让M根据当前选中的文章的id值(topicID)去查询数据库
  M_topic.findTopicById(topicID,(err,data)=>{
    if(err){
      return res.send({
        code:500,
        msg:"服务器错误",
      })
    }
    // if(data.length===0){
    //   return res.send({
    //     code:1,
    //     msg:"改文章已被删除"
    //   })
    // }
   
    res.render("topic/show.html",{
      topic:data[0],
      sessionUserId:req.session.user.id 
    });
  });
}
//删除文档
exports.handleDeleTopic =(req,res)=>{
  //使用该文章的id
  const  topicID = req.params.topicID;
  //让M操作数据库:根据topicID删除数据
  M_topic.deleTopicById(topicID,(err,data)=>{
    if(err){
      return res.send({
        code:500,
        msg:"服务器错了"
      });
    }
    //删除成功  回到列表页
    res.redirect("/");
  })

}

//渲染编辑页面
exports.showEditTopic = (req,res)=>{
  const topicID = req.params.topicID;
  //让M操作数据库:根据topic查询数据
  M_topic.findTopicById(topicID,(err,data)=>{
    if(err){
      return res.send({
        code:500,
        msg:"服务器错了"
      })
    }

    res.render("topic/edit.html",{
      topic:data[0]
    });
  })
}

//处理编辑表单
exports.handleEditTopic =(req,res)=>{
  //获取表单数据
  const body = req.body;
  //获取当前编辑的topicID
  const topicID = req.params.topicID;
  //让M操作数据库:修改数据
  M_topic.editTopicById(topicID,body,(err,data)=>{
    if(err){
      return res.send({
        code:500,
        msg:"服务器错了"
      })
    }
    res.send({
      code:200,
      msg:"编辑成功"
    })
  });
}