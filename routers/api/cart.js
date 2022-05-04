//login@regist
const express = require('express');
const router = express.Router()
const cart = require('../../models/cart')

const passport = require('passport');

const { session } = require('passport');

//@router get api/cart/text
//@desc 返回的请求的json数据
//@access public
router.get('/text',(req,res)=>{
  res.json({mes:'text'})
})


//@router podt api/cart/add
//@desc 存入json数据
//@access private
router.post("/add",(req,res)=>{
  cart.findOne({
    userid:req.body.userid,
    prodid:req.body.prodid
  }).then(ret=>{
    if(!ret){
      // console.log(ret);
      const newcart =new cart({})
      if(req.body.userid) newcart.userid = req.body.userid;
      if(req.body.prodid) newcart.prodid = req.body.prodid;
      if(req.body.name) newcart.name = req.body.name;
      if(req.body.num) newcart.num = req.body.num;  
      if(req.body.imgurl) newcart.imgurl = req.body.imgurl;  
      if(req.body.shopname) newcart.shopname = req.body.shopname;
      if(req.body.isstar) newcart.isstar = req.body.isstar;
      if(req.body.price) newcart.price = req.body.price;
      newcart.select = false
      newcart.save().then(cart=>{
        res.status(200).json({mes:`成功加入购物车了😎`,cart})
      })
    }else{
      // console.log(ret.name);      
      return  res.status(200).json({mes:`${ret.shopname}的${ret.name}已经在购物车了哟😳`})
  }
})

})




//@router get api/cart/getallmes
//@desc 获取所有人的所有的json数据
//@access private
router.post("/getallmes",(req,res)=>{
  cart.find(
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




//@router get api/cart/text
//@desc 搜索商品
//@access public
router.post('/text',(req,res)=>{
  let str=".*"+req.body.name+".*$"
  let reg = new RegExp(str)
  // console.log(req.body.name); 
  // console.log(str);
    // $options:‘i‘ 表示忽略大小写  {name:{$regex:reg,$options: 'i'}}
    cart.find({
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



//@router podt api/cart/edit
//@desc 编辑json数据
//@access private
router.post("/edit",(req,res)=>{
  const newcart ={}
  if(req.body.prodid) newcart.prodid = req.body.prodid;
  if(req.body.name) newcart.name = req.body.name;
  if(req.body.num) newcart.num = req.body.num;    
  if(req.body.imgurl) newcart.imgurl = req.body.imgurl;  
  if(req.body.shopname) newcart.shopname = req.body.shopname;
  if(req.body.isstar) newcart.isstar = req.body.isstar;
  if(req.body.price) newcart.price = req.body.price;
  cart.findByIdAndUpdate(
    {
      userid:req.body.userid,
      prodid:req.body.prodid
    },
    {$set:newcart},
    {new:true}
  ).then(cart=>{
    res.json(cart)
  })
})


//@router post api/cart/delete
//@desc 删除json数据
//@access private
router.post("/delete",(req,res)=>{
  cart.findOneAndRemove({
    userid:req.body.userid,
    prodid:req.body.prodid
  }).then(mes=>{
    if (mes) {
      mes.save().then(cart=>
        res.status(200).json({mes:'已移除购物车',cart})
      )
    }else{
      res.status(200).json({mes:'没有相关内容'})
    }
  }).catch(err=>{
   return res.status(404).json(err)
  })
})



// router.delete("/delete/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
//   cart.findOneAndRemove({name:req.params.name}).then(mes=>{
//     if (mes) {
//       mes.save().then(cart=>res.json(cart))
//     }else{
//       res.status(404).json({mes:'没有相关内容'})
//     }
//   }).catch(err=>{
//     res.status(404).json(err)
//   })
// })
module.exports = router