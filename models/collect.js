const mongoose = require('mongoose');
const Schema = mongoose.Schema
const collectSchema  = new Schema({
  name:{
    type:String,
    required:true
  },
  num:{
    type:Number,
    required:true,
    default:0
  },
  id:{
    type:String,
    required:true
  },  
  imgurl:{
    type:String,
    required:true
  },
  price :{
    type:Number,
    required:true    
  }, 
  isstar:{
    type:Boolean,
    default:false ,
    required:true 
  }, 
  shopname :{
    type:String,
    required:true    
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


module.exports = collect = mongoose.model('collect',collectSchema);