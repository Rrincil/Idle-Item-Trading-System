//login@regist
const express = require('express');
const router = express.Router()
const report = require('../../models/report')

const multer = require('multer')

const passport = require('passport');

const { session } = require('passport');

//@router get api/report/text
//@desc 返回的请求的json数据
//@access public
router.post('/text',(req,res)=>{
  let str=".*"+req.body.name+".*$"
  let reg = new RegExp(str)
  // console.log(req.body.name); 
  // console.log(str);
    // $options:‘i‘ 表示忽略大小写  {name:{$regex:reg,$options: 'i'}}
    report.find({
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


router.get('/text2',(req,res)=>{
  res.json({mes:'kdk'})
})

//@router podt api/report/add
//@desc 存入json数据
//@access public
router.post("/add",passport.authenticate("jwt",{session:false}),(req,res)=>{
    report.findOne({
      name:req.body.name
    }).then(ret=>{
      if(!ret){
        // console.log(ret);
        const newreport =new report({})
        // const imgurl = 'http://localhost:3000/img/'
        // if(req.body.userid) newreport.userid = req.body.userid;        
        if(req.body.name) newreport.name = req.body.name;
        // if(req.body.num) newreport.num = req.body.num;
        // if(req.body.remark) newfavorites.remark = null;  
        // if(req.body.goods_introduce) newreport.goods_introduce = req.body.goods_introduce  
        // if(req.body.shopname) newreport.shopname = req.body.shopname;
        // if(req.body.goods_cat) newreport.goods_cat = req.body.goods_cat;
        // if(req.body.isstar) newreport.isstar = false;
        // if(req.body.price) newreport.price = req.body.price;
        // if(req.body.imgurl) newreport.imgurl = req.body.imgurl;
        newreport.save().then(report=>{
          // res.json()
          res.status(200).json({mes:`成功加入购物车了`,report})
        })
      }else{
        // console.log(ret.name);      
        return  res.status(500).json({mes:`已经在购物车了哟`})
      }
  
    })
})








//@router get api/report/getallmes
//@desc 获取所有的json数据
//@access private
router.post("/getallmes",(req,res)=>{
  report.find(
    {
      userid:req.body.userid      
    }
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



//@router get api/report/:id
//@desc 获取单个json数据
//@access public
router.get("/:id",(req,res)=>{
  report.findOne({_id:req.params.id}).then(mes=>{
    if (mes) {
      res.json(mes)
    }else{
      res.status(404).json({mes:'没有相关内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})



//@router podt api/report/edit
//@desc 编辑json数据
//@access public
router.post("/edit/:id",(req,res)=>{


  const newreport =new report({})
  const imgurl = 'http://localhost:3000/img/'
  if(req.body.name) newreport.name = req.body.name;
  if(req.body.num) newreport.num = req.body.num;
  if(req.body.remark) newfavorites.remark = req.body.remark;  
  if(req.body.imgurl) newreport.imgurl = imgurl+req.body.imgurl;  
  if(req.body.shopname) newreport.shopname = req.body.shopname;
  if(req.body.isstar) newreport.isstar = req.body.isstar;
  if(req.body.price) newreport.price = req.body.price;
  // if(req.body.cat_id) newreport.cat_id = req.body.cat_id
  report.findByIdAndUpdate(
    {_id:req.params.id},
    {$set:newreport},
    {new:true}
  ).then(report=>{
    res.json(report)
  })
})


//@router post api/report/delete
//@desc 删除json数据
//@access public
router.post("/delete",passport.authenticate("jwt",{session:false}),(req,res)=>{
  report.findOneAndRemove({
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

//@router get api/report/togetallmes
//@desc 获取所有的json数据
//@access private
// router.get("/togetallmes",(req,res)=>{
//   report.find().then(mes=>{
//     if (mes) {
//       res.json(mes)
//     }else{
//       res.status(500).json({mes:'没有任何内容'})
//     }
//   }).catch(err=>{
//     res.status(500).json(err)
//   })
// })

//@router get api/report/findone
//@desc 获取单个json数据
//@access private
router.post("/findone",passport.authenticate("jwt",{session:false}),(req,res)=>{
  report.findOne({
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


//@router get api/report/findcate
//@desc 获取单个json数据
//@access private
router.post("/findcate",(req,res)=>{
  let str=".*"+req.body.goods_cat+".*$"
  let reg = new RegExp(str)
  report.find({
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



//@router post api/report/addreport
//npm i body-parser
//@desc 返回的请求的json数据
//@access public
router.post('/addreport',(req,res)=>{
    
  //根据id更新数据 report.findByIdAndUpdate('id',{更新的内容},(err,ret)=>{})
  report.findByIdAndUpdate(req.body._id,{
    $set:{
    name:req.body.report.name,num:req.body.report.num,price:req.body.report.price,
    imgurl:req.body.report.imgurl
  }
  },{ new: true }).then(report=>{
    if(report){
      // report.report = req.body.report
      res.json({
        success:'success',
        report
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
