const mongoose = require('mongoose');
const Schema = mongoose.Schema
const reportSchema  = new Schema({
  userid:{
    type: String,
    require :true
  },
  legend:{
    type: Object,
    require :true
  },
  yAxis:{
    type: Array,
    require :true
  },
  xAxis:{
    type: Array,
    require :true
  },
  series:{
    type: Array,
    require :true
  },  
  title:{
    type: Object,
    require :true
  },
  tooltip:{
    type: Object,
    require :true
  },
  grid:{
    type: Object,
    require :true
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


module.exports = report = mongoose.model('report',reportSchema);