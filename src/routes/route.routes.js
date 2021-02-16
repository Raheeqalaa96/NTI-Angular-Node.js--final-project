const express=require('express')
const routeModel=require('../models/route.model')

const router= new express.Router()

router.post('/addRout', async(req,res)=>{
    const rout = new routeModel(req.body)
    try{
        await rout.save()
        res.status(200).send({
            status:1,
            data:rout,
            message:'route added successfuly'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e.message,
            message: 'error inserting route'
        })
    }
})

router.patch('/route/:id', async(req,res)=>{
    availableUpdates = ['name']
    const reqKeys = Object.keys(req.body)
    flag = reqKeys.every(key=> availableUpdates.includes(key))
    try{
        if(!flag) throw new Error('updates not available')
        await routeModel.findByIdAndUpdate(req.params.id, req.body, {runValidators:true})
        data = await routeModel.findById(req.params.id)
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

router.delete('/route/:id', async(req,res)=>{
    const id = req.params.id
    try{
        await routeModel.findByIdAndDelete(id)
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


module.exports = router