//login@regist
const express = require('express');
const router = express.Router()
const collect = require('../../models/collect')

const passport = require('passport');

const { session } = require('passport');

//@router get api/collect/text
//@desc 返回的请求的json数据
//@access public
router.get('/text',(req,res)=>{
  res.json({mes:'text'})
})


//@router podt api/collect/add
//@desc 存入json数据
//@access private
router.post("/add/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
  collect.findOne({
    id:req.body._id
  }).then(ret=>{
    if(!ret){
      // console.log(ret);
      const newcollect =new collect({})
      if(req.body.name) newcollect.name = req.body.name;
      if(req.body.num) newcollect.num = req.body.num;  
      if(req.body.imgurl) newcollect.imgurl = req.body.imgurl;  
      if(req.body.shopname) newcollect.shopname = req.body.shopname;
      if(req.body.isstar) newcollect.isstar = req.body.isstar;
      if(req.body.price) newcollect.price = req.body.price;
      if(req.body._id) newcollect.id = req.body._id;
      newcollect.save().then(collect=>{
        res.status(200).json({mes:`成功收藏了😎`,collect})
        // res.json(collect)
      })
     
    }else{
      // console.log(ret.name);      
      return  res.status(200).json({mes:`${ret.shopname}的${ret.name}已经被收藏了哟😳`})
    }

  })

})








//@router get api/collect/getallmes
//@desc 获取所有的json数据
//@access private
router.get("/getallmes",passport.authenticate("jwt",{session:false}),(req,res)=>{
  collect.find().then(mes=>{
    if (mes) {
      res.json(mes)
    }else{
      res.status(404).json({mes:'没有任何内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})



//@router get api/collect/:id
//@desc 获取单个json数据
//@access private
router.post("/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
  collect.findOne({
    id:req.body._id
  }).then(mes=>{
    if (mes) {
      return  res.json(mes)
    }else{
      // res.status(200).json({mesg:'没有相关内容'})
      res.status(404)
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})



//@router podt api/collect/edit
//@desc 编辑json数据
//@access private
router.post("/edit/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
  const newcollect ={}

  if(req.body.name) newcollect.name = req.body.name;
  if(req.body.num) newcollect.num = req.body.num;    
  if(req.body.imgurl) newcollect.imgurl = req.body.imgurl;  
  if(req.body.shopname) newcollect.shopname = req.body.shopname;
  if(req.body.isstar) newcollect.isstar = req.body.isstar;
  if(req.body.price) newcollect.price = req.body.price;
  collect.findByIdAndUpdate(
    {_id:req.params.id},
    {$set:newcollect},
    {new:true}
  ).then(collect=>{
    res.json(collect)
  })
})


//@router post api/collect/delete/:id
//@desc 删除json数据
//@access private
router.post("/delete/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
  collect.findOneAndRemove({
    id:req.body._id
  }).then(mes=>{
    if (mes) {
      mes.save().then(collect=>
        res.status(200).json({mes:'已取消收藏',collect})
        )
    }else{
      // res.status(200).json({mes:'没有相关内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})
module.exports = router