//login@regist
const express = require('express');
const router = express.Router()
const menu = require('../../models/menu')

const multer = require('multer')

const passport = require('passport');

const { session } = require('passport');

//@router get api/menu/text
//@desc 返回的请求的json数据
//@access public
router.get('/text',(req,res)=>{
  res.json({mes:'text'})
})


//@router podt api/menu/add
//@desc 存入json数据
//@access public
router.post("/add",(req,res)=>{
  menu.findOne({
    name:req.body.name
  }).then(ret=>{
    if(!ret){
      console.log(ret);
      const newmenu =new menu({})
      // const imgurl = 'http://localhost:3000/img/'
      if(req.body.name) newmenu.name = req.body.name;
      if(req.body.num) newmenu.num = req.body.num;
      if(req.body.remark) newfavorites.remark = req.body.remark;  
      if(req.body.imgurl) newmenu.imgurl = req.body.imgurl;  
      if(req.body.shopname) newmenu.shopname = req.body.shopname;
      if(req.body.isstar) newmenu.isstar = req.body.isstar;
      if(req.body.price) newmenu.price = req.body.price;
      newmenu.save().then(menu=>{
        res.json(menu)
        res.status(200).json({mes:`成功加入购物车了`})
      })
    }else{
      // console.log(ret.name);      
      return  res.status(200).json({mes:`${ret.shopname}的${ret.name}之前已经在购物车了哟`})
    }

  })

})








//@router get api/menu/getallmes
//@desc 获取所有的json数据
//@access private
router.get("/getallmes",(req,res)=>{
  menu.find().then(mes=>{
    if (mes) {
      res.json(mes)
    }else{
      res.status(404).json({mes:'没有任何内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})



//@router get api/menu/:id
//@desc 获取单个json数据
//@access public
router.get("/:id",(req,res)=>{
  menu.findOne({_id:req.params.id}).then(mes=>{
    if (mes) {
      res.json(mes)
    }else{
      res.status(404).json({mes:'没有相关内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})



//@router podt api/menu/edit
//@desc 编辑json数据
//@access public
// router.post("/edit/:id",(req,res)=>{


//   const newmenu =new menu({})
//   const imgurl = 'http://localhost:3000/img/'
//   if(req.body.name) newmenu.name = req.body.name;
//   if(req.body.num) newmenu.num = req.body.num;
//   if(req.body.remark) newfavorites.remark = req.body.remark;  
//   if(req.body.imgurl) newmenu.imgurl = imgurl+req.body.imgurl;  
//   if(req.body.shopname) newmenu.shopname = req.body.shopname;
//   if(req.body.isstar) newmenu.isstar = req.body.isstar;
//   if(req.body.price) newmenu.price = req.body.price;

//   menu.findByIdAndUpdate(
//     {_id:req.params.id},
//     {$set:newmenu},
//     {new:true}
//   ).then(menu=>{
//     res.json(menu)
//   })
// })


//@router post api/menu/delete/:id
//@desc 删除json数据
//@access public
router.delete("/deldete/:id",(req,res)=>{
  menu.findOneAndRemove({_id:req.params.id}).then(mes=>{
    if (mes) {
      mes.save().then(menu=>res.json(menu))
    }else{
      res.status(404).json({mes:'没有相关内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})


//@router post api/menu/search
//@desc 删除json数据
//@access public
router.get("/searchI",(req,res)=>{
  let str="^.*"+req.body.name+".*$"
  let reg = new RegExp(str)
  console.log(req.params);
  let _filter = {
    //多字段匹配
        $or: [
            {name:reg},
            // {'categroy': {$regex: reg}},
            // {'lable': {$regex: reg}},
        ]
    }    
  console.log(str);
    // $options:‘i‘ 表示忽略大小写  {name:{$regex:reg,$options: 'i'}}
  menu.find({name:{$regex:reg,$options: 'i'}}).then(mes=>{

    if (mes) {
      res.json(mes)
    }else{
      res.status(404).json({mes:'没有相关内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})






module.exports = router
