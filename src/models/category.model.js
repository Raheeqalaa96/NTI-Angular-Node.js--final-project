const mongoose = require('mongoose')
const CategorySchema = new mongoose.Schema({
    name:{
        type:String,
        minLength:[5,'minmum length'],
        maxLength:30
    },
    parent:{
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref:'Category'
    }
},{
    timestamps:true
})

CategorySchema.virtual('myCategory', {
    ref:'Category',
    localField: '_id',
    foreignField:'parent'
})

CategorySchema.virtual('myProducts', {
    ref:'Product',
    localField: '_id',
    foreignField:'category_id'
})

const Category = mongoose.model('Category', CategorySchema)
module.exports =Category