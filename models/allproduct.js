const mongoose = require('mongoose');
const Schema = mongoose.Schema
const allproductSchema  = new Schema({
  userid:{
    type:String,
    required:true    
  },
  // cat_id:{
  //   type:String,
  //   require:true
  // },
  name:{
    type:String,
    required:true
  },
  num:{
    type:Number,
    required:true,
    default:0
  },
  price:{
    type:Number,
    required:true,
  },
  isstar:{
    type:Boolean,
    required:true,
    default:false
  },  
  imgurl:{
    type:Array,
    required:true
  },
  shopname :{
    type:String,
    required:true    
  },
  remark:{
    type:String,
  }, 
  goods_introduce:{
    type:String,
  },
  goods_cat:{
    type:String,    
  },
  data:{
    type:Date,
    default:Date.now
  }
})

// const Cat = mongoose.model('Cat', { name: String });
// //实例化一个Cat
// const kitty = new Cat({ name: 'Zildjian' });

// //持久化保存这个Kitty实例
// kitty.save().then(() => console.log('meow'));


module.exports = allproduct = mongoose.model('allproduct',allproductSchema);