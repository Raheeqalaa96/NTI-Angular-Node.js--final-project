const mongoose = require('mongoose')
const roleSchema = new mongoose.Schema({
    name:{
        type:String,
        minLength:[5,'minmum length'],
        maxLength:30
    },
    routes:[
        {
            route:{
                type: mongoose.Schema.Types.ObjectId,
                default: null,
                ref:'Route'
            }
        }
    ]
},{
    timestamps:true
})

const Role = mongoose.model('Role', roleSchema)
module.exports =Role