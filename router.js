//路由模块

//1.导包
const express = require('express');
const c_user = require('./controllers/c_user');
const c_topic = require('./controllers/c_topic');
//2.实例化router
const router = express.Router();
//3.配置路由 找方法
router
.get("/signin",c_user.showSignin)
.post("/signin",c_user.handleSignin)
.get("/",c_topic.showTopicList)
.get("/topic/create",c_topic.showCreateTopic)
.post("/createTopic",c_topic.handleCreateTopic)
.get("/signout",c_user.handleSignout)
.get("/detail/topic/:topicID",c_topic.showTopicDetail)
.get("/topic/:topicID/delete",c_topic.handleDeleTopic)
.get("/topic/:topicID/edit",c_topic.showEditTopic)
.post("/edit/topic/:topicID",c_topic.handleEditTopic);


//4.导出
module.exports = router;