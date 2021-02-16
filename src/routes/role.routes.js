const express=require('express')
const roleModel=require('../models/role.model')

const router= new express.Router()

router.post('/addRole', async(req,res)=>{
    const role = new roleModel(req.body)
    try{
        await role.save()
        res.status(200).send({
            status:1,
            data:role,
            message:'Role added successfuly'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e.message,
            message: 'error inserting category'
        })
    }
})

router.patch('/role/:id', async(req,res)=>{
    availableUpdates = ['name']
    const reqKeys = Object.keys(req.body)
    flag = reqKeys.every(key=> availableUpdates.includes(key))
    try{
        if(!flag) throw new Error('updates not available')
        await roleModel.findByIdAndUpdate(req.params.id, req.body, {runValidators:true})
        data = await roleModel.findById(req.params.id)
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
})

router.delete('/role/:id', async(req,res)=>{
    const id = req.params.id
    try{
        await roleModel.findByIdAndDelete(id)
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

router.post('/role/addRoutes/:id', async(req,res)=>{
    rout = req.params.rout
    try{
        role = await roleModel.findById(req.params.id)
        role.routes = role.routes.concat({rout})
        await role.save()
        res.status(200).send({
            status:1,
            data:role,
            message:'role retrived'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e.message,
            message: 'error retrive data'
        })
    }
}) 


module.exports = router