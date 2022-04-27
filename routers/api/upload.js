const express=require('express');
const router=express.Router();
const fs=require('fs');
const path=require('path');
//上传图片的模板
const multer=require('multer'); 
//生成的图片放入uploads文件夹下
const upload=multer({dest:'uploads/'})
router.get('/text',(req,res)=>{
    res.json({mes:'text'})
  })
router.post('/img1',upload.single('test'),(req,res)=>{
console.log(req.file);
res.send('upload img')
})
//图片上传必须用post方法
router.post('/img',upload.single('test'),(req,res)=>{
    //读取文件路径
    fs.readFile(req.file.path,(err,data)=>{
        //如果读取失败
    if(err){return res.send('上传失败')}
    //如果读取成功
    //声明图片名字为时间戳和随机数拼接成的，尽量确保唯一性
    let time=Date.now()+parseInt(Math.random()*999)+parseInt(Math.random()*2222);
    //拓展名
    let extname=req.file.mimetype.split('/')[1]
    //拼接成图片名
    let keepname=time+'.'+extname
    //三个参数
    //1.图片的绝对路径
    //2.写入的内容
    //3.回调函数
    fs.writeFile(path.join(__dirname,'../../static/img/'+keepname),data,(err)=>{
        if(err){return console.log(err);}
        //data:'/img/'+keepname
        res.send({err:0,msg:'上传ok',data:keepname})
    });
 });
})

router.post('/img3',upload.single('test'),(req,res)=>{
    //读取路径（req.file.path）
        fs.readFile(req.file.path,(err,data)=>{
        //读取失败，说明没有上传成功
            if(err){return res.send('上传失败')}  
         //否则读取成功，开始写入
         //我们先尝试用原文件名originalname写入吧
         // 三个参数
         //1.图片的绝对路径
         //2.写入的内容
         //3.回调函数  
          fs.writeFile(path.join(__dirname,'../../static/img/'+req.file.originalname),data,(err)=>{
                if(err){return res.send('写入失败')}
                res.send({err:0,msg:'上传ok'})
            })
        })
    })
    module.exports=router;
    
module.exports=router;


