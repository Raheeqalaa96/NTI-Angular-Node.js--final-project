const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const Role = require('../models/role.model')
const Route = require('../models/route.model')
const auth = async(req, res, next)=>{
    const reqRoute =req.originalUrl.split('/')[1]
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decodedToken = jwt.verify(token, '123456')
        const user = await User.findOne({_id: decodedToken._id, 'tokens.token':token})
        if(!user) throw new Error()
        //if(!user.status) throw new Error()
        const route = await Route.findOne({name: reqRoute})
        if(route){
            const role = await Role.findOne({_id: user.role_id, 'routes.route':route._id})
            if(!role) throw new Error()
        }
        req.token = token
        req.user= user
        next()
    }
    catch(error){
        res.status(400).send({
            error: error.message,
            apiStatus:false,
            data: 'unauthorized user'
        })
    }
}

module.exports = auth