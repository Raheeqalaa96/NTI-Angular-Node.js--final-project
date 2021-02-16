const express=require('express')
const userModel=require('../models/user.model')

const router= new express.Router()

router.post('/login', async(req,res)=>{
    try{
        user = await userModel.findUser(req.body.email, req.body.password)
        const token = await user.generateToken()
        res.send({user, token})
    }
    catch(e){
        res.send(e.message)
    }
}) //working

router.post('/register', async(req, res)=>{
    user = new userModel(req.body)
    try{
        await user.save()
        const token = await user.generateToken()
        res.send({
            status:1,
            message:'added',
            data: user
        })
    }
    catch(e){
        res.send({
            status:0,
            message:e.message,
            data:''
        })
    }
}) //working

router.patch('/user/:id', async(req,res)=>{
    availableUpdates = ['fname', 'lname', 'username','role']
    const reqKeys = Object.keys(req.body)
    flag = reqKeys.every(key=> availableUpdates.includes(key))
    try{
        if(!flag) throw new Error('updates not available')
        await userModel.findByIdAndUpdate(req.params.id, req.body, {runValidators:true})
        data = await userModel.findById(req.params.id)
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
})  //working

router.delete('/user/:id', async(req,res)=>{
    const id = req.params.id
    try{
        await userModel.findByIdAndDelete(id)
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
            message: 'error deleting data'
        })
    }
})

router.patch('/editPassword/:id', async(req,res)=>{
    availableUpdates = ['password']
    const reqKeys = Object.keys(req.body)
    flag = reqKeys.every(key=> availableUpdates.includes(key))
    try{
        if(!flag) throw new Error('updates not available')
        await userModel.findByIdAndUpdate(req.params.id, req.body, {runValidators:true})
        data = await userModel.findById(req.params.id)
        res.status(200).send({
            status:1,
            data:data,
            message: 'password updated'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e.message,
            message: 'error update data'
        })
    }
}) 

router.get('/allUsers', async(req,res)=>{
    try{
        const users = await userModel.find()
        res.status(200).send({
            status:1,
            data:users,
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
})

module.exports = router