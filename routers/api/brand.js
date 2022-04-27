//login@regist
const express = require('express');
const router = express.Router()
const brand = require('../../models/brand')

const passport = require('passport');

const { session } = require('passport');

//@router get api/brand/text
//@desc 返回的请求的json数据
//@access public
router.get('/text',(req,res)=>{
  res.json({mes:'text'})
})


//@router podt api/brand/add
//@desc 存入json数据
//@access private
router.post("/add",passport.authenticate("jwt",{session:false}),(req,res)=>{
  brand.findOne({
    name:req.body.name
  }).then(ret=>{
    if(!ret){
      // console.log(ret);
      const newbrand =new brand({})
      if(req.body.name) newbrand.name = req.body.name;
      if(req.body.num) newbrand.num = req.body.num;  
      if(req.body.imgurl) newbrand.imgurl = req.body.imgurl;  
      if(req.body.shopname) newbrand.shopname = req.body.shopname;
      if(req.body.isstar) newbrand.isstar = req.body.isstar;
      if(req.body.price) newbrand.price = req.body.price;
      newbrand.save().then(brand=>{
        res.status(200).json({mes:`成功加入购物车了😎`,brand})
      })
     
    }else{
      // console.log(ret.name);      
      return  res.status(200).json({mes:`${ret.shopname}的${ret.name}已经在购物车了哟😳`})
    }

  })

})








//@router get api/brand/getallmes
//@desc 获取所有的json数据
//@access private
router.get("/getallmes",passport.authenticate("jwt",{session:false}),(req,res)=>{
  brand.find().then(mes=>{
    if (mes) {
      res.json(mes)
    }else{
      res.status(404).json({mes:'没有任何内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})



//@router get api/brand/:id
//@desc 获取单个json数据
//@access private
router.get("/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
  brand.findOne({name:req.params.name}).then(mes=>{
    if (mes) {
      res.json(mes)
    }else{
      res.status(404).json({mes:'没有相关内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})



//@router podt api/brand/edit
//@desc 编辑json数据
//@access private
router.post("/edit/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
  const newbrand ={}

  if(req.body.name) newbrand.name = req.body.name;
  if(req.body.num) newbrand.num = req.body.num;    
  if(req.body.imgurl) newbrand.imgurl = req.body.imgurl;  
  if(req.body.shopname) newbrand.shopname = req.body.shopname;
  if(req.body.isstar) newbrand.isstar = req.body.isstar;
  if(req.body.price) newbrand.price = req.body.price;
  brand.findByIdAndUpdate(
    {_id:req.params.id},
    {$set:newbrand},
    {new:true}
  ).then(brand=>{
    res.json(brand)
  })
})


//@router post api/brand/delete/:id
//@desc 删除json数据
//@access private
router.delete("/delete/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
  brand.findOneAndRemove({name:req.params.name}).then(mes=>{
    if (mes) {
      mes.save().then(brand=>res.json(brand))
    }else{
      res.status(404).json({mes:'没有相关内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})
module.exports = router