// const mongoose = require('mongoose');
const express = require('express')
const bodeParser = require('body-parser')
const app = express()
const users = require('./routers/api/users');
const { MongoClient } = require('mongodb');
//DB config
const uri = require('./config/keys').mongoURI
const db = client.db('User');

 


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err)=>{
	if(err){
		console.log(err);
		return;
	}
  console.log('数据库连接成功');

  let db = client.db('User');
  db.collection('user').insertOne({ 'username': 'nodejs操作mongodb', 'age': 10 }, (err, result) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("增加成功")
    console.log(result);
    // 操作数据库完成以后要关闭数据库连接
    client.close();
  // })
});






//使用body-parser中间件
// app.use(bodeParser.urlencoded({extended:false}))
// app.use(bodyParser.json())


app.get('/login',(req,res)=>{
  // const user = require('./models/user')
  db.collection('user').insertOne((user)=>{
    if(user){
      meail:req.body.email
    }
  }, (err, result) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("增加成功")
    console.log(result);
    // 操作数据库完成以后要关闭数据库连接
    client.close();
  })
})


//配置首页
app.get('/',(req,res)=>{
  res.send('首页')

})
//使用users
app.use('/api/users',users)



//监听
app.listen(3000,()=>{
  console.log('已启动');
})
