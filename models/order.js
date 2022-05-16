const mongoose = require('mongoose');
const Schema = mongoose.Schema
const orderSchema  = new Schema({
  name:{
    type:String,
    required:false
  },
  serialNo:{
    type:String,
    required:false
  },
  userid:{
    type:String,
    required:false
  },
  Merchantid:{
    type:String,
    required:false
  },
  signname: {
    type:String,
    required:true  
  },
  num:{
    type:Number,
    required:false,
    default:0
  },
  prodid:{
    type:String,
    required:false
  }, 
  usermessage:{
    type:Array,
    required:false
  },
  imgurl:{
    type:Array,
    required:false
  },
  price :{
    type:Number,
    required:false   
  }, 
  isstar:{
    type:Boolean,
    default:false ,
    required:false 
  }, 
  isShip:{
    type:Boolean,
    required:false 
  },
  ispay:{
    type:Boolean,
    required:false 
  },   
  select:{
    type:Boolean,
    default:false ,
  },
  shopname :{
    type:String,
    required:false    
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


module.exports = order = mongoose.model('order',orderSchema);