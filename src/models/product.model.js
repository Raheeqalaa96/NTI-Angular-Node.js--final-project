const mongoose = require('mongoose')
const validator = require('validator')

const proSchema = new mongoose.Schema({
    name:{
        type:String,
        minLength:[5,'minmum length'],
        maxLength:25,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true
    },
    size:{
        type:String
    },
    description:{
        type:String,
        required:true
    },
    discount:{
        type:Number,
        validate(value){
            if(value<0) throw new Error('must be positive')
        },
        default:0
    },
    quantity:{
        type:Number,
        validate(value){
            if(value<0) throw new Error('must be positive')
        },
        default:0
    },
    category_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Category'
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    main_img:{
        type:String,
        trim:true
    },
    images:[
        {
            image:{type:String,
                trim:true}
        }
    ]
},{
    timestamps:true
})

proSchema.virtual('myOrders', {
    ref:'User',
    localField: '_id',
    foreignField:'orders.order.product_id'
})
proSchema.virtual('myRates', {
    ref:'User',
    localField: '_id',
    foreignField:'rates.product_id'
})
const Product = mongoose.model('Product', proSchema)
module.exports = Product