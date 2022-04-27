const mongoose = require('mongoose');
const Schema = mongoose.Schema
const UsersSchema  = new Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  avatar:{
    type:String
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


module.exports = User = mongoose.model('users',UsersSchema);