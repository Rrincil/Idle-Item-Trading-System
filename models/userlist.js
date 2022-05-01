const mongoose = require('mongoose');
const Schema = mongoose.Schema
const userlistsSchema  = new Schema({
  username:{
    type:String,
    required:true
  },
  role_name:{
    type:String,
    require:true
  },  
  sex:{
    type:String,
    required:true
  },    
  create_time:{
    type:Number,
  },
  mobile:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  }, 
  mg_state:{
    type:Boolean,
    default:true
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


module.exports = userlist = mongoose.model('userlists',userlistsSchema);