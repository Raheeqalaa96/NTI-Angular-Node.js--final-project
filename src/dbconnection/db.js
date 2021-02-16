const mongoose=require('mongoose')
mongoose.connect(process.env.MONGODB,{
    useCreateIndex:true, useFindAndModify:true,
    useNewUrlParser:true, useUnifiedTopology:true
})