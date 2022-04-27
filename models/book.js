const mongoose = require('mongoose');
const BookSchema = new mongoose.Schema(
 {
   coverImg: {
     type: String,
   },
   title: {
     type: String,
     required: true,
   },
   writerAvatar: {
     type: String,
   },
   author: {
     type: String,
     required: true,
   },
   workType: {
     type: String,
   },
   serial: {
     type: String,
   },
   descriptions: {
     type: String,
   },
   articleCount: {
     type: String,
   },
   bookCategory: {
     type: mongoose.SchemaTypes.ObjectId,
     ref: 'BookCategory', //跟列表关联起来
   },
 },
 { timestamps: true } //更新和创建的时间戳
);

module.exports = book= mongoose.model('book', BookSchema);
//以下是 mongoose 的所有合法 SchemaTypes：
// String
// Number
// Date
// Buffer
// Boolean
// Mixed
// ObjectId
// Array
// Decimal128
