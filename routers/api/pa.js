const express = require('express');
const router = express.Router();
const pa = require('../../models/pa')
const superagent = require('superagent');
// const charset = require("superagent-charset");
const cheerio = require('cheerio');



//@router get api/pa
//@desc 返回的请求的json数据
//@access public
router.get('/', (req, res, next) =>{
  // res.json({mes:'text'})
  // 用 superagent 去抓取 https://blog.csdn.net/ 的内容
  superagent.get('https://www.taobao.com/?spm=a1z09.2.1581860521.1.6c022e8diiOctD')
    .end( (err, sres)=> {
      // 常规的错误处理
      if (err) {
        return next(err);
      }
      // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
      // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
      const $ = cheerio.load(sres.text);
      const items = [];
      $('.list ul li').each(function (idx, element) {
        var $element = $(element);
        let divimg = $element.find('.img a')
        let href = 'https://www.taobao.com/' +  divimg.attr('href')
        let title =  divimg.attr('title')
        let img = divimg.find('img').attr('src')
        items.push({
          title: title,
          href: href,
          img:img
        });
      });
      res.json({mes:items})
      // res.send(items);
    });
});

//@router get api/pa/text
//@desc 返回的请求的json数据
//@access public
router.get('/text',(req,res)=>{
  res.json({mes:'text'})
})
module.exports = router
