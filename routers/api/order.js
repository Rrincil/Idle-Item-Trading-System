//login@regist
const express = require('express');
const router = express.Router()
const order = require('../../models/order')

const passport = require('passport');

const { session } = require('passport');

//@router get api/order/text
//@desc 返回的请求的json数据
//@access public
router.get('/text',(req,res)=>{
  res.json({mes:'text'})
})


//@router podt api/order/add
//@desc 存入json数据
//@access private
//@router podt api/order/add
//@desc 存入json数据
//@access private
router.post("/add",(req,res)=>{
  order.create(...req.body,(err,data)=>{
    if(err)
    res.status(200).json(err)
  })
})



//前端
//@router get api/order/getallmes
//@desc 获取所有人的所有的json数据
//@access private
router.post("/getallmes",(req,res)=>{
  order.find(
    {
      userid:req.body.userid,
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


//@router get api/order/backgetallmes
//@desc 获取所有人的所有的json数据
//@access private
router.post("/backgetallmes",(req,res)=>{
  order.find(
    {
      Merchantid:req.body.userid,
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


//@router get api/order/text
//@desc 搜索商品
//@access public
router.post('/text',(req,res)=>{
  let str=".*"+req.body.name+".*$"
  let reg = new RegExp(str)
  // console.log(req.body.name); 
  // console.log(str);
    // $options:‘i‘ 表示忽略大小写  {name:{$regex:reg,$options: 'i'}}
    order.find({
      name:reg,
      userid:req.body.userid,
      prodid:req.body.prodid
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



//@router podt api/order/edit
//@desc 编辑json数据
//@access private
router.post("/edit",(req,res)=>{
  order.find(
    {
      _id: req.body._id
    },
    {$set:{
      isShip : req.body.isShip
    }},
    {new:true}
  ).then(order=>{
    res.status(200).json(order)
  })
})




//@router podt api/order/editisPay
//@desc 编辑json数据
//@access private
router.post("/editisPay",(req,res)=>{
  order.findByIdAndUpdate({
    _id:req.body._id
  },{$set:{ispay: 1}},(err)=>{
    console.log(err)
  })
})



//@router podt api/order/editisPay2
//@desc 编辑json数据
//@access private
router.post("/editisPay2",(req,res)=>{
  order.findByIdAndUpdate({
    _id:req.body._id
  },{$set:{ispay: 2}},(err)=>{
    console.log(err)
  })
})


//@router post api/order/delete
//@desc 删除json数据
//@access private
router.post("/delete",(req,res)=>{
  order.findOneAndRemove({
    userid:req.body.userid,
    serialNo:req.body.serialNo
  }).then(mes=>{
    if (mes) {
      mes.save().then(order=>
        res.status(200).json({mes:'已移除购物车',order})
      )
    }else{
      res.status(200).json({mes:'没有相关内容'})
    }
  }).catch(err=>{
   return res.status(404).json(err)
  })
})



// router.delete("/delete/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
//   order.findOneAndRemove({name:req.params.name}).then(mes=>{
//     if (mes) {
//       mes.save().then(order=>res.json(order))
//     }else{
//       res.status(404).json({mes:'没有相关内容'})
//     }
//   }).catch(err=>{
//     res.status(404).json(err)
//   })
// })
module.exports = router