const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt =require('jsonwebtoken')
const validator = require('validator')
const Product = require('./product.model')

const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        minLength:[5,'minmum length'],
        maxLength:25,
        trim:true
    },
    lname:{
        type:String,
        minLength:[5,'minmum length'],
        maxLength:25,
        trim:true
    },
    username:{
        type:String,
        minLength:[5,'minmum length'],
        maxLength:25,
        trim:true,
        required:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('email is invalid')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    addresses:[
        {
            address_type:{type:String},
            details:{type:String}
        }
    ],
    phone:[
        {
            phone:{ type:String,
                    trim:true,
                    validate(value){
                        if(!validator.isMobilePhone(value,'ar-EG')){
                            throw new Error('phone is invalid')
                    }
                }
            }
        }
    ],
    image:{
        type:String,
        trim:true
    },
    status:{
        type:Boolean, 
        default:false
    },
    role_id:{  
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref:'Role'        
    },
    tokens:[
        {
            token:{type:String}
        }
    ],
    orders:[
        {
            order:[
                {
                    product_id:{
                        type: mongoose.Schema.Types.ObjectId,
                        required:true,
                        ref:'Product'
                    },
                    count:{type:Number},
                    date:{type:Date}, 
                    status:{
                        type:String,
                        enum:['cancelled', 'waiting', 'completed'],
                        required: true,
                        default:'waiting'
                    },
                    startDate:{type:Date},
                    endDate:{type:Date}        
                }
            ]
        }
    ],
    rates:[
        {
            rate:{type:Number},
            product_id:{
                type: mongoose.Schema.Types.ObjectId,
                required:true,
                ref:'Product'
            }
        }
    ]
},{
    timestamps:true
})

userSchema.methods.toJSON = function(){
    const user = this.toObject()
    delete user.password
    delete user.__v
    return user
}

userSchema.virtual('myProduct', {
    ref:'Product',
    localField: '_id',
    foreignField:'user_id'
})

userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password'))
        user.password = await bcrypt.hash(user.password, 12)
    next()
})

userSchema.pre('remove', async function(next){
    const user = this
    await Product.deleteMany({user_id: user._id})
    next()
})

userSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWTKEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findUserByCredentials = async (email,password)=>{
    const user = await User.findOne({email})
    if(!user) throw new Error('invalid email')
    flag = await bcrypt.compare(password, user.password)
    if(!flag) throw new Error('invalid pass')
    return user
}

const User = mongoose.model('User', userSchema)
module.exports =User