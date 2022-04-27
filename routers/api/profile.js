//login@regist
const express = require('express');
const router = express.Router()
const profile = require('../../models/profile')

const multer = require('multer')

const passport = require('passport');

const { session } = require('passport');

//@router get api/profile/text
//@desc 返回的请求的json数据
//@access public
router.post('/text',(req,res)=>{
  let str=".*"+req.body.name+".*$"
  let reg = new RegExp(str)
  // console.log(req.body.name); 
  // console.log(str);
    // $options:‘i‘ 表示忽略大小写  {name:{$regex:reg,$options: 'i'}}
  profile.find({name:reg}).then(mes=>{
    if (mes) {
      res.json(mes)
    }else{
      res.status(404).json({mes:'没有相关内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })

})


//@router podt api/profile/add
//@desc 存入json数据
//@access public
router.post("/add",(req,res)=>{
  profile.findOne({
    name:req.body.name
  }).then(ret=>{
    if(!ret){
      console.log(ret);
      const newprofile =new profile({})
      // const imgurl = 'http://localhost:3000/img/'
      if(req.body.name) newprofile.name = req.body.name;
      if(req.body.num) newprofile.num = req.body.num;
      if(req.body.remark) newfavorites.remark = req.body.remark;  
      if(req.body.imgurl) newprofile.imgurl = req.body.imgurl;  
      if(req.body.shopname) newprofile.shopname = req.body.shopname;
      if(req.body.isstar) newprofile.isstar = req.body.isstar;
      if(req.body.price) newprofile.price = req.body.price;
      newprofile.save().then(profile=>{
        res.json(profile)
        res.status(200).json({mes:`成功加入购物车了`})
      })
    }else{
      // console.log(ret.name);      
      return  res.status(200).json({mes:`${ret.shopname}的${ret.name}之前已经在购物车了哟`})
    }

  })

})








//@router get api/profile/getallmes
//@desc 获取所有的json数据
//@access private
router.get("/getallmes",(req,res)=>{
  profile.find().then(mes=>{
    if (mes) {
      res.json(mes)
    }else{
      res.status(404).json({mes:'没有任何内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})



//@router get api/profile/:id
//@desc 获取单个json数据
//@access public
router.get("/:id",(req,res)=>{
  profile.findOne({_id:req.params.id}).then(mes=>{
    if (mes) {
      res.json(mes)
    }else{
      res.status(404).json({mes:'没有相关内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})



//@router podt api/profile/edit
//@desc 编辑json数据
//@access public
router.post("/edit/:id",(req,res)=>{


  const newprofile =new profile({})
  const imgurl = 'http://localhost:3000/img/'
  if(req.body.name) newprofile.name = req.body.name;
  if(req.body.num) newprofile.num = req.body.num;
  if(req.body.remark) newfavorites.remark = req.body.remark;  
  if(req.body.imgurl) newprofile.imgurl = imgurl+req.body.imgurl;  
  if(req.body.shopname) newprofile.shopname = req.body.shopname;
  if(req.body.isstar) newprofile.isstar = req.body.isstar;
  if(req.body.price) newprofile.price = req.body.price;

  profile.findByIdAndUpdate(
    {_id:req.params.id},
    {$set:newprofile},
    {new:true}
  ).then(profile=>{
    res.json(profile)
  })
})


//@router post api/profile/delete/:id
//@desc 删除json数据
//@access public
router.delete("/deldete/:id",(req,res)=>{
  profile.findOneAndRemove({_id:req.params.id}).then(mes=>{
    if (mes) {
      mes.save().then(profile=>res.json(profile))
    }else{
      res.status(404).json({mes:'没有相关内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})


//@router post api/profile/search
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
  profile.find({name:{$regex:reg,$options: 'i'}}).then(mes=>{

    if (mes) {
      res.json(mes)
    }else{
      res.status(404).json({mes:'没有相关内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})



// let projectInfo = require('../projectInfo.json')
// let PictureStore = require(PROXY).pictureStore
 
// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/upload')
//   },
//   filename: function (req, file, cb) {
//     let str = file.originalname.split('.')
//     cb(null, Date.now() + '.' + str[1])
//   }
// })
// let upload = multer({storage: storage})
 
// // 上传图片到图片仓库并返回上传的图片路径
// router.post('/uploadImgs', upload.array('file', 20), function (req, res, next) {
//   let arr = []
//   for (let i in req.files) {
//     arr.push(global.SERVICEADDRESS + '' + req.files[i].filename)
//   }
//   if (req.body.storeId) {
//     PictureStore.updateOnePictureStore({_id: req.body.storeId}, {$addToSet: {pictureimgurlArr: {$each: arr}}}, (err, data) => {
//       res.json({
//         code: 200,
//         data: arr
//       })
//     })
//   } else {
//     PictureStore.updateOnePictureStore({isCommon: true}, {$addToSet: {pictureimgurlArr: {$each: arr}}}, (err, data) => {
//       res.json({
//         code: 200,
//         data: arr
//       })
//     })
//   }
// })







module.exports = router
