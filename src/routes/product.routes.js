const express=require('express')
const proModel=require('../models/product.model')
const auth = require('../middleware/auth')
const router= new express.Router()

router.post('/addProduct', auth , async(req,res)=>{
    const product = new proModel(req.body)
    try{
        await product.save()
        res.status(200).send({
            status:1,
            data:product,
            message:'product added successfuly'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e.message,
            message: 'error inserting data'
        })
    }
}) //working

router.patch('/product/:id', auth , async(req,res)=>{
    availableUpdates = ['name', 'price', 'discount', 'quantity','main_img','category']
    const reqKeys = Object.keys(req.body)
    flag = reqKeys.every(key=> availableUpdates.includes(key))
    try{
        if(!flag) throw new Error('updates not available')
        await proModel.findByIdAndUpdate(req.params.id, req.body, {runValidators:true})
        data = await proModel.findById(req.params.id)
        res.status(200).send({
            status:1,
            data:data,
            message: 'updated'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e.message,
            message: 'error update data'
        })
    }
}) // working

router.patch('/editDisByID/:id', async(req,res)=>{
    availableUpdates = ['discount']
    const reqKeys = Object.keys(req.body)
    flag = reqKeys.every(key=> availableUpdates.includes(key))
    try{
        if(!flag) throw new Error('updates not available')
        await proModel.findByIdAndUpdate(req.params.id, req.body, {runValidators:true})
        data = await proModel.findById(req.params.id)
        res.status(200).send({
            status:1,
            data:data,
            message: 'updated'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e.message,
            message: 'error update data'
        })
    }
}) //working

router.patch('/editDisByCate/:cate', async(req,res)=>{
    availableUpdates = ['discount']
    const reqKeys = Object.keys(req.body)
    flag = reqKeys.every(key=> availableUpdates.includes(key))
    try{
        if(!flag) throw new Error('updates not available')
        await proModel.updateMany({category:req.params.cate,user:'company_id'}, req.body, {runValidators:true})
        data = await proModel.find({category:req.params.cate,user:'company_id'})
        res.status(200).send({
            status:1,
            data:data,
            message: 'updated'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e.message,
            message: 'error update data'
        })
    }
}) //working

//between 
router.patch('/editDisByquan/:quan', async(req,res)=>{
    availableUpdates = ['discount']
    const reqKeys = Object.keys(req.body)
    flag = reqKeys.every(key=> availableUpdates.includes(key))
    try{
        if(!flag) throw new Error('updates not available')
        await proModel.updateMany({quantity:req.params.quan,user:'company_id'}, req.body, {runValidators:true})
        data = await proModel.find({quantity:req.params.quan,user:'company_id'})
        res.status(200).send({
            status:1,
            data:data,
            message: 'updated'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e.message,
            message: 'error update data'
        })
    }
}) //working

router.delete('/product/:id', async(req,res)=>{
    const id = req.params.id
    try{
        await proModel.findByIdAndDelete(id)
        res.status(200).send({
            status:1,
            data:'',
            message:'deleted'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e.message,
            message: 'error inserting data'
        })
    }
})  //working

router.get('/allProducts', async(req,res)=>{
    try{
        const products = await proModel.find()
        res.status(200).send({
            status:1,
            data:products,
            message:'all data retrieved'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e.message,
            message: 'error retreive  data'
        })
    }
}) //working

router.patch('/incProduct/:id', async(req,res)=>{
    const _id = req.params.id
    try{
        old_proQuan = await proModel.findById(_id).select('quantity')
        await proModel.findByIdAndUpdate(
            req.params.id,
            {$inc:{quantity:1}}
            , {runValidators:true})
        data = await proModel.findById(req.params.id)
        res.status(200).send({
            status:1,
            data:data,
            message: 'updated'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e.message,
            message: 'error update data'
        })
    }
}) //working

router.patch('/decProduct/:id', async(req,res)=>{
    const _id = req.params.id
    try{
        old_proQuan = await proModel.findById(_id).select('quantity')
        await proModel.findByIdAndUpdate(
            req.params.id,
            {$inc:{quantity:-1}}
            , {runValidators:true})
        data = await proModel.findById(req.params.id)
        res.status(200).send({
            status:1,
            data:data,
            message: 'updated'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e.message,
            message: 'error update data'
        })
    }
}) //working

router.get('/product/:id', async(req,res)=>{
    _id = req.params.id
    try{
        product = await proModel.findById(_id)
        res.status(200).send({
            status:1,
            data:product,
            message:'product retrived'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e.message,
            message: 'error retrive data'
        })
    }
}) //working

router.get('/cateProduct/:cate', async(req,res)=>{
    cate = req.params.cate
    try{
        products = await proModel.find({category:cate})
        res.status(200).send({
            status:1,
            data:products,
            message:'products retrived'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e.message,
            message: 'error retrive data'
        })
    }
}) //working

router.get('/comProduct/:com', async(req,res)=>{
    com = req.params.com
    try{
        products = await proModel.find({user:com})
        res.status(200).send({
            status:1,
            data:products,
            message:'products retrived'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e.message,
            message: 'error retrive data'
        })
    }
}) //working

//between  range
router.get('/priProduct/:price', async(req,res)=>{
    price = req.params.price
    try{
        products = await proModel.find({price:price})
        res.status(200).send({
            status:1,
            data:products,
            message:'products retrived'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e.message,
            message: 'error retrive data'
        })
    }
}) //working

router.get('/discProduct/:disc', async(req,res)=>{
    disc = req.params.disc
    try{
        products = await proModel.find({discount:disc})
        res.status(200).send({
            status:1,
            data:products,
            message:'products retrived'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e.message,
            message: 'error retrive data'
        })
    }
})//working

// router.get('/latestProducts', async(req,res)=>{
// })

module.exports = router