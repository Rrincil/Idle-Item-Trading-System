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
router.post("/add",(req,res)=>{
  order.findOne({
    userid:req.body.userid,
    Merchantid:req.body.Merchantid
  }).then(ret=>{
    if(!ret){
      // console.log(ret);
      const neworder =new order({})
      if(req.body.serialNo) neworder.serialNo = req.body.serialNo;
      if(req.body.userid) neworder.userid = req.body.userid;
      if(req.body.prodid) neworder.prodid = req.body.prodid;
      if(req.body.Merchantid) neworder.Merchantid = req.body.Merchantid;
      if(req.body.name) neworder.name = req.body.name;
      if(req.body.num) neworder.num = req.body.num;  
      if(req.body.imgurl) neworder.imgurl = req.body.imgurl;  
      if(req.body.shopname) neworder.shopname = req.body.shopname;
      if(req.body.isstar) neworder.isstar = req.body.isstar;
      if(req.body.price) neworder.price = req.body.price;
      neworder.select = false
      neworder.save().then(order=>{
        res.status(200).json({mes:`成功加入购物车了😎`,order})
      })
    }else{
      // console.log(ret.name);      
      return  res.status(200).json({mes:`${ret.shopname}的${ret.name}已经在购物车了哟😳`})
  }
})

})




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
  const neworder ={}
  if(req.body.prodid) neworder.prodid = req.body.prodid;
  if(req.body.name) neworder.name = req.body.name;
  if(req.body.num) neworder.num = req.body.num;    
  if(req.body.imgurl) neworder.imgurl = req.body.imgurl;  
  if(req.body.shopname) neworder.shopname = req.body.shopname;
  if(req.body.isstar) neworder.isstar = req.body.isstar;
  if(req.body.price) neworder.price = req.body.price;
  order.findByIdAndUpdate(
    {
      userid:req.body.userid,
      prodid:req.body.prodid
    },
    {$set:neworder},
    {new:true}
  ).then(order=>{
    res.json(order)
  })
})


//@router post api/order/delete
//@desc 删除json数据
//@access private
router.post("/delete",(req,res)=>{
  order.findOneAndRemove({
    userid:req.body.userid,
    prodid:req.body.prodid
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