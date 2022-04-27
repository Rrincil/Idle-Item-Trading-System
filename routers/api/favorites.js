//login@regist
const express = require('express');
const router = express.Router()
const favorites = require('../../models/Favorites')

const passport = require('passport');

const { session } = require('passport');

//@router get api/favorites/text
//@desc 返回的请求的json数据
//@access public
router.get('/text',(req,res)=>{
  res.json({mes:'text'})
})


//@router podt api/favorites/add
//@desc 存入json数据
//@access private
router.post("/add",passport.authenticate("jwt",{session:false}),(req,res)=>{
  favorites.findOne({
    name:req.body.name
  }).then(ret=>{
    if(!ret){
      const newfavorites =new favorites({})
      if(req.body.name) newfavorites.name = req.body.name;
      // if(req.body.remark) newfavorites.remark = req.body.remark;  
      if(req.body.imgurl) newfavorites.imgurl = req.body.imgurl;  
      if(req.body.shopname) newfavorites.shopname = req.body.shopname;
      if(req.body.isstar) newfavorites.isstar =true;
      newfavorites.save().then(favorites=>{
        res.json(favorites)
      })
      res.status(200).json({mes:`收藏成功😎`})
    }else{
      // console.log(ret.name);      
      return  res.status(200).json({mes:`${ret.shopname}的${ret.name}已经收藏了哟😳`})
    }
  })
})








//@router get api/favorites/getallmes
//@desc 获取所有的json数据
//@access private
router.get("/getallmes",passport.authenticate("jwt",{session:false}),(req,res)=>{
  favorites.find().then(mes=>{
    if (mes) {
      res.json(mes)
    }else{
      res.status(404).json({mes:'没有任何内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})



//@router get api/favorites/:id
//@desc 获取单个json数据
//@access private
router.post("/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
  favorites.findOne({_id:req.params._id}).then(mes=>{
    if (mes) {
      res.json(mes)
    }else{
      res.status(404).json({mes:'没有相关内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})

//@router get api/favorites/mes
//@desc 获取单个json数据
//@access private
router.get("/mes",passport.authenticate("jwt",{session:false}),(req,res)=>{
  favorites.findOne({name:req.body.name}).then(mes=>{
    if (mes) {
      res.json(mes)
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})

//@router podt api/favorites/edit
//@desc 编辑json数据
//@access private
router.post("/edit/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
  const newfavorites ={}

  if(req.body.name) newfavorites.name = req.body.name;
  // if(req.body.remark) newfavorites.remark = req.body.remark;  
  if(req.body.imgurl) newfavorites.imgurl = req.body.imgurl;  
  if(req.body.shopname) newfavorites.shopname = req.body.shopname;
  if(req.body.isstar) newfavorites.isstar = req.body.isstar;
  favorites.findByIdAndUpdate(
    {_id:req.params.id},
    {$set:newfavorites},
    {new:true}
  ).then(favorites=>{
    res.json(favorites)
  })
   
})


//@router post api/favorites/delete/:id
//@desc 删除json数据
//@access private
router.delete("/delete/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
  favorites.findOneAndRemove({_id:req.params._id}).then(mes=>{
    if (mes) {
      mes.save().then(favorites=>res.json(favorites))
      res.status(200).json({mes:`取消收藏😳`})
    }else{
      res.status(404).json({mes:'没有相关内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})
module.exports = router