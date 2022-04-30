//login@regist
const express = require('express');
const router = express.Router()
const categorie = require('../../models/categorie')

const passport = require('passport');

const { session } = require('passport');

//@router get api/categorie/text
//@desc 返回的请求的json数据
//@access public
router.get('/text',(req,res)=>{
  res.json({mes:'text'})
})


//@router podt api/categorie/add
//@desc 存入json数据
//@access private
router.post("/add",passport.authenticate("jwt",{session:false}),(req,res)=>{
  categorie.findOne({
    cat_id:req.body.cat_id
  }).then(ret=>{
    if(!ret){
      // console.log(ret);
      const newcategorie =new categorie({})
      if(req.body.cat_id) newcategorie.cat_id = req.body.cat_id;
      if(req.body.cat_name) newcategorie.cat_name = req.body.cat_name;  
      if(req.body.cat_pid) newcategorie.cat_pid = req.body.cat_pid;  
      if(req.body.cat_level) newcategorie.cat_level = req.body.cat_level;
      if(req.body.cat_deleted) newcategorie.cat_deleted = req.body.cat_deleted;
      newcategorie.save().then(categorie=>{
        res.status(200).json({mes:`成功添加分类了😎`,categorie})
      })
     
    }else{
      // console.log(ret.name);      
      return  res.status(200).json({mes:`已经有分类了哟😳`})
    }

  })

})








//@router get api/categorie/getallmes
//@desc 获取所有的json数据
//@access private
router.get("/getallmes",passport.authenticate("jwt",{session:false}),(req,res)=>{
  categorie.find().then(mes=>{
    if (mes) {
      res.json(mes)
    }else{
      res.status(404).json({mes:'没有任何内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})



//@router get api/categorie/find
//@desc 获取单个json数据
//@access private
router.get("find",passport.authenticate("jwt",{session:false}),(req,res)=>{
  categorie.findOne({type:req.params.name}).then(mes=>{
    if (mes) {
      res.json(mes)
    }else{
      res.status(404).json({mes:'没有相关内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})



//@router podt api/categorie/edit
//@desc 编辑json数据
//@access private
router.post("/edit/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
  const newcategorie ={}

  if(req.body.name) newcategorie.name = req.body.name;
  if(req.body.num) newcategorie.num = req.body.num;    
  if(req.body.imgurl) newcategorie.imgurl = req.body.imgurl;  
  if(req.body.shopname) newcategorie.shopname = req.body.shopname;
  if(req.body.isstar) newcategorie.isstar = req.body.isstar;
  if(req.body.price) newcategorie.price = req.body.price;
  categorie.findByIdAndUpdate(
    {_id:req.params.id},
    {$set:newcategorie},
    {new:true}
  ).then(categorie=>{
    res.json(categorie)
  })
})


//@router post api/categorie/delete/:id
//@desc 删除json数据
//@access private
router.delete("/delete/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
  categorie.findOneAndRemove({name:req.params.name}).then(mes=>{
    if (mes) {
      mes.save().then(categorie=>res.json(categorie))
    }else{
      res.status(404).json({mes:'没有相关内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})
module.exports = router