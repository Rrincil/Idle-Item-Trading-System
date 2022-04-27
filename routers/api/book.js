// const mongoose = require('mongoose'); //引入猫鼬
// const {Book } = require('../../models/book');//引入数据模型
// const cheerio = require('cheerio');//对抓取的数据进行dom操作，把数据提取出来
// const { get } = require('axios').default;
// const router = require('./cart');
// // router.get('/mes')
// get('http://www.scujj.edu.cn').then(res => {
//   const $ = cheerio.load(res.data).then(res=>{
//     console.log('====================================');
//     console.log(res);
//     console.log('====================================');
//   });
//   var books = [];
//   $('#tsSlideList li').each(function() {
//     let book = {};
//     book.coverImgUrl = $(this)
//       .find('img')
//       .attr('src');
//       //把数据放进数组
//     books.push(book);
//   });
//   //insertMany()是一个方法，把数据按照模型存储到本地数据库
//   Book.insertMany(books)
//     .then(res => {
//       console.log('信息收集成功');
//     })
//     .catch(err => {
//       console.log('信息收集出现错误');
//     });
// });
