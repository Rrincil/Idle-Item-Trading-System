//login@regist
const express = require('express');
const router = express.Router()
const userlist = require('../../models/userlist')
const bcrypt = require('bcrypt')
const gravatar = require('gravatar'); 
const jwt = require('jsonwebtoken');
const passport = require('passport');

const { session } = require('passport');

//@router get api/userlists/login
//@desc 返回的请求的json数据
//@access public
router.get('/text',(req,res)=>{
  res.json({mes:'text'})
})


//@router post api/userlist/add
//npm i body-parser
//@desc 返回的请求的json数据
//@access public
router.post("/add",(req,res)=>{
  userlist.findOne({
    mobile:req.body.mobile
  }).then(ret=>{
    if(!ret){
      console.log(ret);
      const newuserlist =new userlist({})
      if(req.body.username) newuserlist.username = req.body.username;
      if(req.body.role_name) newuserlist.role_name = '超级VIP';
      if(req.body.sex) newuserlist.sex = req.body.sex;
      if(req.body.create_time) newfavorites.create_time = req.body.create_time;  
      if(req.body.mobile) newuserlist.mobile = req.body.mobile;  
      if(req.body.email){
        newuserlist.email = req.body.email;
      }
      if(req.body.mg_state) newuserlist.mg_state = true;
      newuserlist.save().then(userlist=>{
        res.status(200).json({mes:`成功加入购物车了`,userlist})
      })
    }else{
      // console.log(ret.name);      
      return  res.status(200).json({mes:`${ret.shopname}的${ret.name}之前已经在购物车了哟`})
    }

  })

})








//@router get api/userlist/getallmes
//@desc 获取所有的json数据
//@access private
router.get("/getallmes",(req,res)=>{
  userlist.find().then(mes=>{
    if (mes) {
      res.json(mes)
    }else{
      res.status(404).json({mes:'没有任何内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})



//@router post api/userlist/delete
//@desc 删除json数据
//@access private
router.post("/delete",passport.authenticate("jwt",{session:false}),(req,res)=>{
  userlist.findOneAndRemove({
    _id:req.body._id
  }).then(mes=>{
    if (mes) {
      mes.save().then(userlist=>
        res.status(200).json({mes:'已移除购物车',userlist})
      );
      
    }else{
      res.status(200).json({mes:'没有相关内容'})
    }
  }).catch(err=>{
   return res.status(404).json(err)
  })
})


//@router post api/userlist/adduserlist
//npm i body-parser
//@desc 返回的请求的json数据
//@access public
router.post('/adduserlist',(req,res)=>{
  //根据id更新数据 userlist.findByIdAndUpdate('id',{更新的内容},(err,ret)=>{})
  userlist.findByIdAndUpdate(req.body._id,{
    $set:{
      username:req.body.userlist.username,email:req.body.userlist.email,mobile:req.body.userlist.mobile,
  }
  },{ new: true }).then(userlist=>{
    if(userlist){
      // userlist.userlist = req.body.userlist
      res.json({
        success:'success',
        userlist
      })
    }
  })
})







//@router podt api/userlists/edit
//@desc 编辑json数据
//@access private
router.post("/edit/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
  const newuserlists ={}
  if(req.body.name) newuserlists.name = req.body.name;
  if(req.body.email) newuserlists.email = req.body.email;    
  if(req.body.password) newuserlists.password = req.body.password;  

  userlist.findByIdAndUpdate(
    {_id:req.params.id},
    {$set:newuserlists},
    {new:true}
  ).then(userlist=>{
    res.json(userlist)
  })
})



//@router get api/userlist/findone
//@desc 获取单个json数据
//@access private
router.post("/findone",passport.authenticate("jwt",{session:false}),(req,res)=>{
  userlist.findOne({_id:req.body._id}).then(mes=>{
    if (mes) {
      res.json(mes)
    }else{
      res.status(404).json({mes:'没有相关内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})


//@router post api/userlists/current
//npm i body-parser
//@desc 返回 current userlist
//@access private

// router.get('/crrent','验证token',(req,res)=>{})
//npm i passport
//npm i passport-jwt
// router.get('/crrent','验证token',(req,res)=>{})

router.get("/current",passport.authenticate("jwt",{session:false}),(req,res)=>{
  res.json({
    id:req.userlist.id,
    name:req.userlist.name,
    email:req.userlist.email,
    avatar:req.userlist.avatar,
    
  }); 
})

module.exports = router


















