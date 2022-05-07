//login@regist
const express = require('express');
const router = express.Router()
const categorie = require('../../models/categorie')

const passport = require('passport');

const { session } = require('passport');

//@router get api/categorie/text
//@desc 返回的请求的json数据
//@access public
router.get('/text',(req,res)=>{
  res.json({mes:'text'})
})


//@router podt api/categorie/add
//@desc 存入分类数据
//@access private
router.post("/add",(req,res)=>{
  categorie.findOne({
    cat_name:req.body.cat_name,
    userid: req.body.userid     
  }).then(ret=>{
    if(!ret){
      const newcategorie =new categorie({})
      const cateparams = ''
      if(req.body.cateparams){
        newcategorie.cateparams = req.body.cateparams
      }else{
        newcategorie.cateparams = cateparams
      }
      if(req.body.userid) newcategorie.userid = req.body.userid 
      if(req.body.cat_id) newcategorie.cat_id = req.body.cat_id;
      if(req.body.cat_name) newcategorie.cat_name = req.body.cat_name;  
      if(req.body.cat_pid) newcategorie.cat_pid = req.body.cat_pid;  
      // if(req.body.cat_level) newcategorie.cat_level = req.body.cat_level;
      if(req.body.cat_deleted){
        newcategorie.cat_deleted = req.body.cat_deleted;
      }else{
        newcategorie.cat_deleted = false
      }
      newcategorie.save().then(categorie=>{
        res.status(200).json({mes:`成功添加分类了😎`,ret})
      })   
    }else{
      console.log(ret)
      const newcategorie =new categorie({})
      const cateparams = ''
      if(req.body.cateparams){
        newcategorie.cateparams = req.body.cateparams
      }else{
        newcategorie.cateparams = cateparams
      }
      if(req.body.userid) newcategorie.userid = req.body.userid 
      if(req.body.cat_id) newcategorie.cat_id = req.body.cat_id;
      if(req.body.cat_name) newcategorie.cat_name = req.body.cat_name;  
      if(req.body.cat_pid) newcategorie.cat_pid = req.body.cat_pid;  
      // if(req.body.cat_level) newcategorie.cat_level = req.body.cat_level;
      if(req.body.cat_deleted){
        newcategorie.cat_deleted = req.body.cat_deleted;
      }else{
        newcategorie.cat_deleted = false
      }      
      if(ret.children.push(newcategorie))   
      return  res.status(200).json({mes:`已经添加分类了`})
    }
  })
})




//@router get api/categorie/togetallmes
//@desc 获取所有的json数据
//@access private
router.post("/togetallmes",passport.authenticate("jwt",{session:false}),(req,res)=>{
  categorie.find(
  ).then(mes=>{
    if (mes) {
      res.json(mes)
    }else{
      res.status(500).json({mes:'没有任何内容'})
    }
  }).catch(err=>{
    res.status(500).json(err)
  })
})



//@router get api/categorie/getallmes
//@desc 获取所有的json数据
//@access private
router.post("/getallmes",passport.authenticate("jwt",{session:false}),(req,res)=>{
  categorie.find(
  {
    userid : req.body.userid    
  }
  ).then(mes=>{
    if (mes) {
      res.json(mes)
    }else{
      res.status(500).json({mes:'没有任何内容'})
    }
  }).catch(err=>{
    res.status(500).json(err)
  })
})
//前端
//@router get api/categorie/getonemes
//@desc 获取所有的json数据
//@access private
router.post("/getonemes",(req,res)=>{
  categorie.findOne(
  {
    cat_name : req.body.cat_name  
  }
  ).then(mes=>{
    if (mes) {
      res.json(mes)
    }else{
      res.status(500).json({mes:'没有任何内容'})
    }
  }).catch(err=>{
    res.status(500).json(err)
  })
})

//增加分类参数
//@router post api/categorie/addcateparams
//npm i body-parser
//@desc 返回的请求的json数据
//@access public
router.post('/addcateparams',(req,res)=>{
  //根据id更新数据 categorie.findByIdAndUpdate('id',{更新的内容},(err,ret)=>{})
  categorie.findByIdAndUpdate(
    {
      _id:req.body._id,
      userid:req.body.userid      
    }
    ,{
    $set:{
      attr_name:req.body.attr_name
    }
  },{ new: true }).then(categorie=>{
    if(categorie){
      // categorie.categorie = req.body.categorie
      res.json({
        success:'success',
        categorie
      })
    }
  }).catch(err=>{
    console.log(err);
  })
})


router.post('/updata',(req,res) => {
  categorie.updateOne({_id:req.body._id},{$set:{
    attr_name:req.body.attr_name  
   }},() => {})   
})//更改商品属性,回调不能省略



//获取分类参数
//@router get api/categorie/getparams
//@desc 获取所有的json数据
//@access private
router.post("/getparams",(req,res)=>{
  categorie.findOne(
  {
    cat_name : req.body.cat_name  
  }
  ).then(mes=>{
    if (mes) {
      res.json(mes.attr_name)
    }else{
      res.status(500).json({mes:'没有任何内容'})
    }
  }).catch(err=>{
    res.status(500).json(err)
  })
})


//@router get api/categorie/finds
//@desc 获取单个json数据
//@access private
router.post("/finds",passport.authenticate("jwt",{session:false}),(req,res)=>{
  categorie.updated(
    {
      cat_id:req.body.cat_id,
      userid:req.body.userid
    },{
      $set:{
        cat_name : req.body.cat_name
      }
    }
  ).then(mes=>{
    if (mes) {
      res.json(mes)
    }else{
      res.status(500).json({mes:'没有相关内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})



//@router podt api/categorie/edit
//@desc 编辑json数据
//@access private
router.post("/edit",passport.authenticate("jwt",{session:false}),(req,res)=>{
  const newcategorie ={}
  if(req.body.name) newcategorie.name = req.body.name;
  if(req.body.num) newcategorie.num = req.body.num;    
  if(req.body.imgurl) newcategorie.imgurl = req.body.imgurl;  
  if(req.body.shopname) newcategorie.shopname = req.body.shopname;
  if(req.body.isstar) newcategorie.isstar = req.body.isstar;
  if(req.body.price) newcategorie.price = req.body.price;
  categorie.findByIdAndUpdate(
    {_id:req.params.id},
    {$set:newcategorie},
    {new:true}
  ).then(categorie=>{
    res.json(categorie)
  })
})


//@router post api/categorie/delete
//@desc 删除json数据
//@access private
router.post("/delete",(req,res)=>{
  categorie.findOneAndRemove({
    _id:req.body._id,
    userid:req.body.userid
  }).then(mes=>{
    if (mes) {
      mes.save().then(categorie=>
        res.status(200).json({mes:'已移除',categorie})
      )
    }else{
      res.status(200).json({mes:'没有相关内容'})
    }
  }).catch(err=>{
   return res.status(404).json(err)
  })
})
module.exports = router