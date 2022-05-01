const mongoose = require('mongoose');
const express = require('express')
// const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const passport  = require('passport')
const uri = require('./config/keys').mongoURI
// 引入模板
const users = require('./routers/api/users');
const profile = require('./routers/api/profile')
const favorites = require('./routers/api/favorites')
const cart = require('./routers/api/cart')
const collect = require("./routers/api/collect")
const book = require('./routers/api/book')
const upload = require('./routers/api/upload');
const brand = require('./routers/api/brand');
const swiper = require('./routers/api/swiper');
const activity = require('./routers/api/activity');
const allproduct = require('./routers/api/allproduct');
const pa = require('./routers/api/pa');
const menu = require('./routers/api/menus');
const categorie = require('./routers/api/categorie')
const userlist = require('./routers/api/userlist')
// const bodyParser = require('body-parser');
// 连接 MongoDB 数据库
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{

  console.log('成功');
}).catch(err=>{
  console.log(err);
})
// app.use(passport.initialize());
//调用 passport.js 并将passport传入
// require('./config/passport',passport)
//passport初始化
app.use(passport.initialize())
app.use(passport.session())





const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt
// const mongoose = require("mongoose")
const User = mongoose.model("users") 
const keys = require('./config/keys')
 
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey ="secret"
// var opts = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: keys.secretOrKey,
// };
// module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user)
          }
          return done(null, false)
        })
        .catch(err => console.log(err))
  }));
// }






//使用body-parser中间件
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//配置首页
app.get('/',(req,res)=>{
  res.send('首页')
})


//使用users
app.use('/api/users',users)
//使用profile
app.use('/api/profile',profile)
//使用favorites
app.use('/api/favorites',favorites)
//使用cart
app.use('/api/cart',cart)
//使用book
// app.use('/api/book',book)
//使用
app.use('/api/upload',upload)
// 配置静态资源目录 整一个文件夹 通过域名能访问
app.use(express.static(path.join(__dirname,"./static")))
//使用brand
app.use('/api/brand',brand)
//使用swiper
app.use('/api/swiper',swiper)
//使用collect
app.use('/api/collect',collect)
//使用activity
app.use('/api/activity',activity)
//使用allproduct
app.use('/api/allproduct',allproduct)
//使用pa
app.use('/api/pa',pa)
//使用菜单
app.use('/api/menu',menu)
//使用分类
app.use('/api/categorie',categorie)
// 用户列表
app.use('/api/userlist',userlist)

//监听
app.listen(3001,()=>{
  console.log('已启动');
})



