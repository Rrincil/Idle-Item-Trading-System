const mongoose = require('mongoose');
const Schema = mongoose.Schema
const FavoritesSchema  = new Schema({
  name:{
    type:String,
    required:true
  },
  imgurl:{
    type:String,
    required:true
  },
  shopname :{
    type:String,
    required:true    
  }, 
  isstar:{
    type:Boolean,
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


module.exports = favorites = mongoose.model('favorites',FavoritesSchema);