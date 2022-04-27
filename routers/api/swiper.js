//login@regist
const express = require('express');
const router = express.Router()
const swiper = require('../../models/swiper')

const multer = require('multer')

const passport = require('passport');

const { session } = require('passport');

//@router get api/swiper/text
//@desc 返回的请求的json数据
//@access public
router.get('/text',(req,res)=>{
  res.json({mes:'text'})
})


//@router podt api/swiper/add
//@desc 存入json数据
//@access public
router.post("/add",(req,res)=>{
  swiper.findOne({
    name:req.body.name
  }).then(ret=>{
    if(!ret){
      console.log(ret);
      const newswiper =new swiper({})
      const imgurl = 'http://localhost:3000/img/'
      if(req.body.name) newswiper.name = req.body.name;
      if(req.body.num) newswiper.num = req.body.num;  
      if(req.body.imgurl) newswiper.imgurl = imgurl+req.body.imgurl;  
      if(req.body.shopname) newswiper.shopname = req.body.shopname;
      if(req.body.start) newswiper.start = req.body.start;
      if(req.body.price) newswiper.price = req.body.price;
      newswiper.save().then(swiper=>{
        res.json(swiper)
        res.status(200).json({mes:`成功加入购物车了`})
      })
    }else{
      // console.log(ret.name);      
      return  res.status(200).json({mes:`${ret.shopname}的${ret.name}之前已经在购物车了哟`})
    }

  })

})








//@router get api/swiper/getallmes
//@desc 获取所有的json数据
//@access private
router.get("/getallmes",(req,res)=>{
  swiper.find().then(mes=>{
    if (mes) {
      res.json(mes)
    }else{
      res.status(404).json({mes:'没有任何内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})



//@router get api/swiper/:id
//@desc 获取单个json数据
//@access public
router.get("/:id",(req,res)=>{
  swiper.findOne({_id:req.params.id}).then(mes=>{
    if (mes) {
      res.json(mes)
    }else{
      res.status(404).json({mes:'没有相关内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})



//@router podt api/swiper/edit
//@desc 编辑json数据
//@access public
router.post("/edit/:id",(req,res)=>{


  const newswiper =new swiper({})
  const imgurl = 'http://localhost:3000/img/'
  if(req.body.name) newswiper.name = req.body.name;
  if(req.body.num) newswiper.num = req.body.num;  
  if(req.body.imgurl) newswiper.imgurl = imgurl+req.body.imgurl;  
  if(req.body.shopname) newswiper.shopname = req.body.shopname;
  if(req.body.start) newswiper.start = req.body.start;
  if(req.body.price) newswiper.price = req.body.price;

  swiper.findByIdAndUpdate(
    {_id:req.params.id},
    {$set:newswiper},
    {new:true}
  ).then(swiper=>{
    res.json(swiper)
  })
})


//@router post api/swiper/deconste/:id
//@desc 删除json数据
//@access public
router.delete("/deldete/:id",(req,res)=>{
  swiper.findOneAndRemove({_id:req.params.id}).then(mes=>{
    if (mes) {
      mes.save().then(swiper=>res.json(swiper))
    }else{
      res.status(404).json({mes:'没有相关内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})





// var projectInfo = require('../projectInfo.json')
// let PictureStore = require(PROXY).pictureStore
 
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/upload')
//   },
//   filename: function (req, file, cb) {
//     var str = file.originalname.split('.')
//     cb(null, Date.now() + '.' + str[1])
//   }
// })
// var upload = multer({storage: storage})
 
// // 上传图片到图片仓库并返回上传的图片路径
// router.post('/uploadImgs', upload.array('file', 20), function (req, res, next) {
//   var arr = []
//   for (var i in req.files) {
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
