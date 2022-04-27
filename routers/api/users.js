//login@regist
const express = require('express');
const router = express.Router()
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const gravatar = require('gravatar'); 
const jwt = require('jsonwebtoken');
const passport = require('passport');

const { session } = require('passport');

//@router get api/users/login
//@desc 返回的请求的json数据
//@access public
router.get('/text',(req,res)=>{
  res.json({mes:'text'})
})


//@router post api/users/registe
//npm i body-parser
//@desc 返回的请求的json数据
//@access public
router.post('/registe',(req,res)=>{
  // res.setHeader('Content-Type','application/x-www-form-urlencoded')
  // console.log(req.body);
    
  //查询数据库中是否拥有邮箱
  User.findOne({ 
    email:req.body.email
  }).then((user)=>{
    if((user)){
      return res.status(404).json({mes:"邮箱已被注册"})
    }else{
      // const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
      const avater = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      const newUser = new User({
        name:req.body.name,
        email:req.body.email,
        avatar:avater,
        password:req.body.password,
      })
                // //存储数据
                // newUser.save()
                // .then(user=>res.json(user))
                // .catch(err=>console.log(err));  

      // 加密：npm i bcrypt
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if(err) throw err;
            //把加密后的密码hash赋值给newUser.password
            newUser.password = hash;

            //存储数据
            newUser.save()
                    .then(user=>res.json(user))
                    .catch(err=>console.log(err));            
        });
    });
    }
  })
  
})





//@router post api/users/addcart
//npm i body-parser
//@desc 返回的请求的json数据
//@access public
router.post('/addcart',(req,res)=>{
    
  //根据id更新数据 User.findByIdAndUpdate('id',{更新的内容},(err,ret)=>{})
  User.findByIdAndUpdate(req.body.id,{
    cart:req.body.cart,
  }).then(user=>{
    if(user){
      // user.cart = req.body.cart
      res.json({
        success:'success',
        cart:req.body.cart
      })
    }
  })
  

  
})







//@router podt api/users/edit
//@desc 编辑json数据
//@access private
router.post("/edit/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
  const newusers ={}
  if(req.body.name) newusers.name = req.body.name;
  if(req.body.email) newusers.email = req.body.email;    
  if(req.body.password) newusers.password = req.body.password;  

  User.findByIdAndUpdate(
    {_id:req.params.id},
    {$set:newusers},
    {new:true}
  ).then(user=>{
    res.json(user)
  })
})






//@router post api/users/login
//npm i body-parser
//@desc 返回 token jwt passport
//@access public
router.post('/login',(req,res)=>{
  User.findOne({
    email:req.body.email
  }).then((user)=>{
    // console.log(user);
    if(user){
      // console.log(user);
      bcrypt.compare(req.body.password, user.password).then((result)=>{
        if(result){
          // jwt.sign('规则','加密名字',{过期时间},(err,token)=>{})
          const rule = {
            id:user.id,
            email:user.email,
            name:user.name,
            avatar:user.avatar,
            password:user.password
          }
          // expiresIn: 3600 //存活时间
          jwt.sign(rule,'secret',{expiresIn:3600000},(err,token)=>{
            if(err) throw err;
            res.json({
              success:'success',
              token:'Bearer '+token
            })
          })
        //  return res.json({mes:'成功'})
        }else{
         return res.status(404).json({mes:'密码不正确'})
        }
    });
    }else{
      return res.status(404).json({mes:'用户名未注册'})
    }
  })
})





//@router post api/users/current
//npm i body-parser
//@desc 返回 current user
//@access private

// router.get('/crrent','验证token',(req,res)=>{})
//npm i passport
//npm i passport-jwt
// router.get('/crrent','验证token',(req,res)=>{})

router.get("/current",passport.authenticate("jwt",{session:false}),(req,res)=>{
  res.json({
    id:req.user.id,
    name:req.user.name,
    email:req.user.email,
    avatar:req.user.avatar,
    
  }); 
})

module.exports = router


















