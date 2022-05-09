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
//@desc 存入分类数据
//@access private
router.post("/add",(req,res)=>{
  if(typeof(req.body.cat_id[0])=='undefined'){
    req.body.cat_id[0] = 1
  }
  categorie.findOne({
    cat_id: parseInt(req.body.cat_id[0]),
    userid: req.body.userid     
  }).then(ret=>{
    
    if(!ret){
      // console.log(req.body.cat_id.length)
      // 如果没有分类
      const newcategorie = new categorie({})
      const cateparams = ''
      if(req.body.cateparams){
        newcategorie.cateparams = req.body.cateparams
      }else{
        newcategorie.cateparams = cateparams
      }
      if(req.body.userid) newcategorie.userid = req.body.userid 
      if(req.body.cat_id) newcategorie.cat_id = 2200+req.body.catid11;
      if(req.body.cat_name) newcategorie.cat_name = req.body.cat_name;  
      if(req.body.cat_pid) newcategorie.cat_pid = 0;  
      // if(req.body.cat_level) newcategorie.cat_level = req.body.cat_level;
      if(req.body.cat_deleted){
        newcategorie.cat_deleted = req.body.cat_deleted;
      }else{
        newcategorie.cat_deleted = false
      }
      newcategorie.cat_level = 0
      console.log(newcategorie.cat_id);
      newcategorie.save().then(categorie=>{
        res.status(200).json({mes:`成功添加一级分类了😎`,ret})
      })   
    }else{
      // console.log(ret)
      //如果是二级分类
      if(req.body.cat_id.length==2){
        const a = ret.children
        a.map(item=>{
          if(item.cat_id === req.body.cat_id[1] ){
            if(typeof(item.children)=='undefined'){
              const catid = 0
              const newcategorie ={}
              const cateparams = '' 
              if(req.body.cateparams){
                newcategorie.cateparams = req.body.cateparams
              }else{
                newcategorie.cateparams = cateparams
              }
              if(req.body.cat_id) newcategorie.cat_id = 2220+catid;
              if(req.body.cat_name) newcategorie.cat_name = req.body.cat_name;  
              newcategorie.cat_pid =  req.body.cat_id[0]    
              newcategorie.cat_pid2 =  req.body.cat_id[1]
              // if(req.body.cat_level) newcategorie.cat_level = req.body.cat_level;
              if(req.body.cat_deleted){
                newcategorie.cat_deleted = req.body.cat_deleted;
              }else{
                newcategorie.cat_deleted = false
              } 
              newcategorie.cat_level = 2
              item.children =[]                  
              item.children.push(newcategorie)
              
            }else{
              const catid = item.children.length
              const newcategorie ={}
              const cateparams = '' 
              if(req.body.cateparams){
                newcategorie.cateparams = req.body.cateparams
              }else{
                newcategorie.cateparams = cateparams
              }
              if(req.body.cat_id) newcategorie.cat_id = 2220+catid;
              if(req.body.cat_name) newcategorie.cat_name = req.body.cat_name;  
              newcategorie.cat_pid =  req.body.cat_id[0]    
              newcategorie.cat_pid2 =  req.body.cat_id[1]
              if(req.body.cat_deleted){
                newcategorie.cat_deleted = req.body.cat_deleted;
              }else{
                newcategorie.cat_deleted = false
              }         
              newcategorie.cat_level = 2         
              item.children.push(newcategorie)
              console.log(item)
            }            
          }
        })
        ret.children = []
        ret.save().then(cate=>{
          cate.children = a
          cate.save().then(cate2=>{

            res.status(200).json({mes:`已经添加三级分类了`})
          })
        })
        
      }else if(req.body.cat_id.length==3){
       // 如果有三级分类，添加四级分类
      //  const a = ret.children
      //  a.map(item=>{
      //    if(item.cat_id === req.body.cat_id[1] ){
      //       const catid = 0
      //       const newcategorie ={}
      //       const cateparams = '' 
      //       if(req.body.cateparams){
      //         newcategorie.cateparams = req.body.cateparams
      //       }else{
      //         newcategorie.cateparams = cateparams
      //       }
      //       if(req.body.cat_id) newcategorie.cat_id = 2220+catid;
      //       if(req.body.cat_name) newcategorie.cat_name = req.body.cat_name;  
      //       if(req.body.cat_pid) newcategorie.cat_pid = req.body.cat_pid;  
      //       // if(req.body.cat_level) newcategorie.cat_level = req.body.cat_level;
      //       if(req.body.cat_deleted){
      //         newcategorie.cat_deleted = req.body.cat_deleted;
      //       }else{
      //         newcategorie.cat_deleted = false
      //       }                   
      //       item.children.map(item2=>{
      //         if(item2.cat_id == req.body.cat_id[2]){
      //           //第三类
      //           if(typeof(item2.children)=='undefined'){
      //             item
      //             if(item2.cat_id === req.body.cat_id[1])
      //             item2.children.push(newcategorie)
      //           }else{

      //           }    
      //         }       
      //      })    
      //     }
      //  })
      //  ret.children = []
      //  ret.save().then(cate=>{
      //    cate.children = a
      //    cate.save().then(cate2=>{

      //      res.status(200).json({mes:`已经添加三级分类了`})
      //    })
      //  })   
      res.status(200).json({mes:`最多添加三级分类`})       
      }else if(req.body.cat_id.length==1){
        // 添加二级分类
        console.log(2)
        const catid = ret.children.length
        const newcategorie ={}
        const cateparams = ''
        if(req.body.cateparams){
          newcategorie.cateparams = req.body.cateparams
        }else{
          newcategorie.cateparams = cateparams
        }
        if(req.body.cat_id) newcategorie.cat_id = 2210+catid;
        // console.log(newcategorie.cat_id)
        if(req.body.cat_name) newcategorie.cat_name = req.body.cat_name;  
        newcategorie.cat_pid =  req.body.cat_id[0]  
        // if(req.body.cat_level) newcategorie.cat_level = req.body.cat_level;
        if(req.body.cat_deleted){
          newcategorie.cat_deleted = req.body.cat_deleted;
        }else{
          newcategorie.cat_deleted = false
        }     
        newcategorie.cat_level = 1
        // newcategorie.children = [] 
        if(typeof(ret.children)=='undefined'){
          ret.children = []
          ret.children.push(newcategorie)
          ret.save()
          res.status(200).json({mes:`已经添加二级分类了`})          
        }else{
          ret.children.push(newcategorie)
          ret.save()
          res.status(200).json({mes:`已经添加二级分类了`})            
        }
        // console.log(ret.children);    
      }
    }
  })
})




//@router get api/categorie/togetallmes
//@desc 获取所有的json数据
//@access private
router.post("/togetallmes",passport.authenticate("jwt",{session:false}),(req,res)=>{
  categorie.find(
  ).then(mes=>{
    if (mes) {
      res.json(mes)
    }else{
      res.status(500).json({mes:'没有任何内容'})
    }
  }).catch(err=>{
    res.status(500).json(err)
  })
})



//@router get api/categorie/getallmes
//@desc 获取所有的json数据
//@access private
router.post("/getallmes",passport.authenticate("jwt",{session:false}),(req,res)=>{
  categorie.find(
  {
    userid : req.body.userid    
  }
  ).then(mes=>{
    if (mes) {
      res.json(mes)
    }else{
      res.status(500).json({mes:'没有任何内容'})
    }
  }).catch(err=>{
    res.status(500).json(err)
  })
})
//前端
//@router get api/categorie/getonemes
//@desc 获取所有的json数据
//@access private
router.post("/getonemes",(req,res)=>{
  categorie.findOne(
  {
    cat_name : req.body.cat_name  
  }
  ).then(mes=>{
    if (mes) {
      res.json(mes)
    }else{
      res.status(500).json({mes:'没有任何内容'})
    }
  }).catch(err=>{
    res.status(500).json(err)
  })
})

//增加分类参数
//@router post api/categorie/addcateparams
//npm i body-parser
//@desc 返回的请求的json数据
//@access public
router.post('/addcateparams',(req,res)=>{
  //根据id更新数据 categorie.findByIdAndUpdate('id',{更新的内容},(err,ret)=>{})
  categorie.findByIdAndUpdate(
    {
      _id:req.body._id,
      userid:req.body.userid      
    }
    ,{
    $set:{
      attr_name:req.body.attr_name
    }
  },{ new: true }).then(categorie=>{
    if(categorie){
      // categorie.categorie = req.body.categorie
      res.json({
        success:'success',
        categorie
      })
    }
  }).catch(err=>{
    console.log(err);
  })
})


router.post('/updata',(req,res) => {
  categorie.updateOne({_id:req.body._id},{$set:{
    attr_name:req.body.attr_name  
   }},() => {})   
})//更改商品属性,回调不能省略



//获取分类参数
//@router get api/categorie/getparams
//@desc 获取所有的json数据
//@access private
router.post("/getparams",(req,res)=>{
  categorie.findOne(
  {
    cat_name : req.body.cat_name  
  }
  ).then(mes=>{
    if (mes) {
      res.json(mes.attr_name)
    }else{
      res.status(500).json({mes:'没有任何内容'})
    }
  }).catch(err=>{
    res.status(500).json(err)
  })
})


//@router get api/categorie/finds
//@desc 获取单个json数据
//@access private
router.post("/finds",passport.authenticate("jwt",{session:false}),(req,res)=>{
  categorie.updated(
    {
      cat_id:req.body.cat_id,
      userid:req.body.userid
    },{
      $set:{
        cat_name : req.body.cat_name
      }
    }
  ).then(mes=>{
    if (mes) {
      res.json(mes)
    }else{
      res.status(500).json({mes:'没有相关内容'})
    }
  }).catch(err=>{
    res.status(404).json(err)
  })
})





//@router podt api/categorie/findparams
//@desc 编辑json数据
//@access private
router.post("/findparams",passport.authenticate("jwt",{session:false}),(req,res)=>{
  if(req.body.cat_level ==1){
    //第二级
    categorie.findOne({
      cat_id:req.body.cat_pid,
      userid:req.body.userid
    }).then(ret=>{
      if (ret) {
        // console.log(ret.children);
        const idx = ret.children.findIndex(x => x.cat_id === req.body.cat_id)
        const a = ret.children[idx].cateparams         
        res.status(200).json({params:a})               
      }else{
        res.status(200).json({mes:'没有相关内容'})
      }
    }) 
  }else if(req.body.cat_level ==2){
    //第三级
    categorie.findOne({
      cat_id:req.body.cat_pid,
      userid:req.body.userid
    }).then(ret=>{
      if (ret) {
        const idx = ret.children.findIndex(x => x.cat_id === req.body.cat_pid2)
        const idx2 = ret.children[idx].children.findIndex(x => x.cat_id === req.body.cat_id)
        // console.log(idx2);
        const a = ret.children[idx].children[idx2].cateparams                  
        res.status(200).json({params:a})      
      }else{
        res.status(200).json({mes:'没有相关内容'})
      }
    }) 

  }else if(req.body.cat_level ==0){
    categorie.findOne({
      cat_id:req.body.cat_id,
      userid:req.body.userid
    }).then(mes=>{
      if (mes) {
        const a = mes.cateparams
        res.status(200).json({params:a})       
      }else{
        res.status(200).json({mes:'没有相关内容'})
      }
    }).catch(err=>{
     return res.status(404).json(err)
    })
  }
})



//@router podt api/categorie/edit
//@desc 编辑json数据
//@access private
router.post("/edit",passport.authenticate("jwt",{session:false}),(req,res)=>{
  if(req.body.cat_level ==1){
    //第二级
    categorie.findOne({
      cat_id:req.body.cat_pid,
      userid:req.body.userid
    }).then(ret=>{
      if (ret) {
        // console.log(ret.children);
        const idx = ret.children.findIndex(x => x.cat_id === req.body.cat_id)
        ret.children[idx].cateparams = req.body.cateparams    
        const b = ret.children
        ret.children = []
        ret.save().then(cate=>{
          cate.children = b
          cate.save().then(cate2=>{
            res.status(200).json({mes:`已经修改二级分类参数了`})
          })
        })        
      }else{
        res.status(200).json({mes:'没有相关内容'})
      }
    }) 
  }else if(req.body.cat_level ==2){
    //第三级
    categorie.findOne({
      cat_id:req.body.cat_pid,
      userid:req.body.userid
    }).then(ret=>{
      if (ret) {
        const idx = ret.children.findIndex(x => x.cat_id === req.body.cat_pid2)
        const idx2 = ret.children[idx].children.findIndex(x => x.cat_id === req.body.cat_id)
        // console.log(idx2);
        ret.children[idx].children[idx2].cateparams = req.body.cateparams   
        const b = ret.children
        // console.log(b);
        ret.children = []
        ret.save().then(cate=>{
          cate.children = b
          cate.save().then(cate2=>{
            res.status(200).json({mes:`已修改三级分类参数成功`})
          })
        })        
      }else{
        res.status(200).json({mes:'没有相关内容'})
      }
    }) 

  }else if(req.body.cat_level ==0){
    categorie.findOneAndRemove({
      cat_id:req.body.cat_id,
      userid:req.body.userid
    }).then(mes=>{
      if (mes) {
        mes.cateparams = req.body.cateparams
        mes.save().then(categorie=>
          res.status(200).json({mes:'已修改一级分类参数成功',categorie})
        )
      }else{
        res.status(200).json({mes:'没有相关内容'})
      }
    }).catch(err=>{
     return res.status(404).json(err)
    })
  }
})


//@router post api/categorie/delete
//@desc 删除json数据
//@access private
router.post("/delete",(req,res)=>{
  if(req.body.cat_level ==1){
    //第二级
    categorie.findOne({
      cat_id:req.body.cat_pid,
      userid:req.body.userid
    }).then(ret=>{
      if (ret) {
        // console.log(ret.children);
        const idx = ret.children.findIndex(x => x.cat_id === req.body.cat_id)
        ret.children.splice(idx, 1)    
        const b = ret.children
        ret.children = []
        ret.save().then(cate=>{
          cate.children = b
          cate.save().then(cate2=>{
            res.status(200).json({mes:`已经删除二级分类了`})
          })
        })        
      }else{
        res.status(200).json({mes:'没有相关内容'})
      }
    }) 
  }else if(req.body.cat_level ==2){
    //第三级
    categorie.findOne({
      cat_id:req.body.cat_pid,
      userid:req.body.userid
    }).then(ret=>{
      if (ret) {
        const idx = ret.children.findIndex(x => x.cat_id === req.body.cat_pid2)
        const idx2 = ret.children[idx].children.findIndex(x => x.cat_id === req.body.cat_id)
        // console.log(idx2);
        ret.children[idx].children.splice(idx2, 1)    
        const b = ret.children
        // console.log(b);
        ret.children = []
        ret.save().then(cate=>{
          cate.children = b
          cate.save().then(cate2=>{
            res.status(200).json({mes:`已经删除三级分类了`})
          })
        })        
      }else{
        res.status(200).json({mes:'没有相关内容'})
      }
    }) 

  }else if(req.body.cat_level ==0){
    categorie.findOneAndRemove({
      cat_id:req.body.cat_id,
      userid:req.body.userid
    }).then(mes=>{
      if (mes) {
        mes.save().then(categorie=>
          res.status(200).json({mes:'已移除一级分类了',categorie})
        )
      }else{
        res.status(200).json({mes:'没有相关内容'})
      }
    }).catch(err=>{
     return res.status(404).json(err)
    })
  }
})
module.exports = router