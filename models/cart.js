const mongoose = require('mongoose');
const Schema = mongoose.Schema
const CartSchema  = new Schema({
  name:{
    type:String,
    required:true
  },
  userid:{
    type:String,
    required:true
  },
  num:{
    type:Number,
    required:true,
    default:0
  },
  prodid:{
    type:String,
    required:true
  }, 
  imgurl:{
    type:Array,
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
  select:{
    type:Boolean,
    default:false ,
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


module.exports = cart = mongoose.model('cart',CartSchema);