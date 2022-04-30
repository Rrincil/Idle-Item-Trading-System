const mongoose = require('mongoose');
const Schema = mongoose.Schema
const menuSchema  = new Schema({
  authName:{
    type:String,
    required:true
  },
  id:{
    type:String,
    required:true
  },   
  path:{
    type:String,
    required:true
  },
  children:{
    type:Array,
    required:true    
  }, 
  order:{
    type:Number,
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


module.exports = menu = mongoose.model('menu',menuSchema);