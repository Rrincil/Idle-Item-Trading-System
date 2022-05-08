const mongoose = require('mongoose');
const Schema = mongoose.Schema
const categorieSchema  = new Schema({
  userid:{
    type:String,
    required:true    
  },  
  cat_id:{
    type:Number,
    required:true
  },
  cat_name:{
    type:String,
    required:true,
  },
  cat_pid:{
    type:Number,
    required:true,
    default:0
  },  
  cat_pid2:{
    type:Number,
  },    
  cat_level:{
    type:Number,
    required:true,
    default:0
  },    
  cat_deleted:{
    type:Boolean,
    required:true,
    default:false
  },
  children:{
    type:Array,
  },
  data:{
    type:Date,
    default:Date.now
  },
  cateparams:{
    type:String, 
  }
})

// const Cat = mongoose.model('Cat', { name: String });
// //实例化一个Cat
// const kitty = new Cat({ name: 'Zildjian' });

// //持久化保存这个Kitty实例
// kitty.save().then(() => console.log('meow'));


module.exports = categorie = mongoose.model('categorie',categorieSchema);