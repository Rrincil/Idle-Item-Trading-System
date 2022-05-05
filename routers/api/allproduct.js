//login@regist
const express = require('express');
const router = express.Router()
const allproduct = require('../../models/allproduct')

const multer = require('multer')

const passport = require('passport');

const { session } = require('passport');

//@router get api/allproduct/text
//@desc 返回的请求的json数据
//@access public
router.post('/text',(req,res)=>{
  let str=".*"+req.body.name+".*$"
  let reg = new RegExp(str)
  // console.log(req.body.name); 
  // console.log(str);
    // $options:‘i‘ 表示忽略大小写  {name:{$regex:reg,$options: 'i'}}
    allproduct.find({
      name:reg,
      userid:req.body.userid
    }).then(mes=>{
    if (mes) {
      res.json(mes)
    }else{
      res.status(404).json({mes:'没有相关内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})


//@router get api/allproduct//search
//@desc 返回的请求的json数据
//@access public
router.post('/search',(req,res)=>{
  let str=".*"+req.body.name+".*$"
  let reg = new RegExp(str)
  // console.log(req.body.name); 
  // console.log(str);
    // $options:‘i‘ 表示忽略大小写  {name:{$regex:reg,$options: 'i'}}
    allproduct.find({
      name:reg
    }).then(mes=>{
    if (mes) {
      res.json(mes)
    }else{
      res.status(404).json({mes:'没有相关内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})


//@router podt api/allproduct/add
//@desc 存入json数据
//@access public
router.post("/add",passport.authenticate("jwt",{session:false}),(req,res)=>{
  allproduct.findOne({
    userid:req.body.userid
  }).then(re=>{
    allproduct.findOne({
      name:req.body.name
    }).then(ret=>{
      if(!ret){
        // console.log(ret);
        const newallproduct =new allproduct({})
        // const imgurl = 'http://localhost:3000/img/'
        if(req.body.userid) newallproduct.userid = req.body.userid;        
        if(req.body.name) newallproduct.name = req.body.name;
        if(req.body.num) newallproduct.num = req.body.num;
        if(req.body.remark) newfavorites.remark = null;  
        if(req.body.goods_introduce) newallproduct.goods_introduce = req.body.goods_introduce  
        if(req.body.shopname) newallproduct.shopname = req.body.shopname;
        if(req.body.goods_cat) newallproduct.goods_cat = req.body.goods_cat;
        if(req.body.isstar) newallproduct.isstar = false;
        if(req.body.price) newallproduct.price = req.body.price;
        if(req.body.imgurl) newallproduct.imgurl = req.body.imgurl;
        newallproduct.save().then(allproduct=>{
          // res.json()
          res.status(200).json({mes:`成功加入购物车了`,allproduct})
        })
      }else{
        // console.log(ret.name);      
        return  res.status(500).json({mes:`已经在购物车了哟`})
      }
  
    })
  })
})








//@router get api/allproduct/getallmes
//@desc 获取所有的json数据
//@access private
router.post("/getallmes",(req,res)=>{
  allproduct.find(
  {
    userid:req.body.userid
  }
  // ,null,{skip:req.body.pagesnum}
  ).then(mes=>{
    if (mes) {
      res.json(mes)
    }else{
      res.status(404).json({mes:'没有任何内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})



//@router get api/allproduct/:id
//@desc 获取单个json数据
//@access public
router.get("/:id",(req,res)=>{
  allproduct.findOne({_id:req.params.id}).then(mes=>{
    if (mes) {
      res.json(mes)
    }else{
      res.status(404).json({mes:'没有相关内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})



//@router podt api/allproduct/edit
//@desc 编辑json数据
//@access public
router.post("/edit/:id",(req,res)=>{


  const newallproduct =new allproduct({})
  const imgurl = 'http://localhost:3000/img/'
  if(req.body.name) newallproduct.name = req.body.name;
  if(req.body.num) newallproduct.num = req.body.num;
  if(req.body.remark) newfavorites.remark = req.body.remark;  
  if(req.body.imgurl) newallproduct.imgurl = imgurl+req.body.imgurl;  
  if(req.body.shopname) newallproduct.shopname = req.body.shopname;
  if(req.body.isstar) newallproduct.isstar = req.body.isstar;
  if(req.body.price) newallproduct.price = req.body.price;
  // if(req.body.cat_id) newallproduct.cat_id = req.body.cat_id
  allproduct.findByIdAndUpdate(
    {_id:req.params.id},
    {$set:newallproduct},
    {new:true}
  ).then(allproduct=>{
    res.json(allproduct)
  })
})


//@router post api/allproduct/delete
//@desc 删除json数据
//@access public
router.post("/delete",passport.authenticate("jwt",{session:false}),(req,res)=>{
  allproduct.findOneAndRemove({
    _id:req.body._id,
    userid:req.body.userid
  }).then(mes=>{
    if (mes) {
      mes.save().then(cart=>
        res.status(200).json({mes:'已移除购物车',cart})
      );
      
    }else{
      res.status(200).json({mes:'没有相关内容'})
    }
  }).catch(err=>{
   return res.status(404).json(err)
  })
})

//@router get api/allproduct/togetallmes
//@desc 获取所有的json数据
//@access private
router.post("/togetallmes",(req,res)=>{
  allproduct.find(
  ).then(mes=>{
    if (mes) {
      res.json(mes)
    }else{
      res.status(500).json({mes:'没有任何内容'})
    }
  }).catch(err=>{
    res.status(500).json(err)
  }).catch(err=>{
    res.status(500).json(err)
  })
})

//@router get api/allproduct/findone
//@desc 获取单个json数据
//@access private
router.post("/findone",passport.authenticate("jwt",{session:false}),(req,res)=>{
  allproduct.findOne({
    _id:req.body._id
  }).then(mes=>{
    if (mes) {
      res.json(mes)
    }else{
      res.status(404).json({mes:'没有相关内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})


//@router get api/allproduct/findcate
//@desc 获取单个json数据
//@access private
router.post("/findcate",(req,res)=>{
  let str=".*"+req.body.goods_cat+".*$"
  let reg = new RegExp(str)
  allproduct.find({
    goods_cat:reg
  }).then(mes=>{
    if (mes) {
      res.json(mes)
    }else{
      res.status(404).json({mes:'没有相关内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})



//@router post api/allproduct/addallproduct
//npm i body-parser
//@desc 返回的请求的json数据
//@access public
router.post('/addallproduct',(req,res)=>{
    
  //根据id更新数据 allproduct.findByIdAndUpdate('id',{更新的内容},(err,ret)=>{})
  allproduct.findByIdAndUpdate(req.body._id,{
    $set:{
    name:req.body.allproduct.name,num:req.body.allproduct.num,price:req.body.allproduct.price,
    imgurl:req.body.allproduct.imgurl
  }
  },{ new: true }).then(allproduct=>{
    if(allproduct){
      // allproduct.allproduct = req.body.allproduct
      res.json({
        success:'success',
        allproduct
      })
    }
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
