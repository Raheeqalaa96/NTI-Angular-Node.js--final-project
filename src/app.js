const express = require('express')
require('./dbconnection/db')
const app = express()
port = process.env.PORT || 3000
const productRoutes = require('./routes/product.routes')
const userRoutes = require('./routes/user.routes')
const cateRoutes = require('./routes/category.routes')
const roleRoutes = require('./routes/role.routes')
const routeRoutes = require('./routes/route.routes')


app.use(express.json())
app.use(productRoutes)
app.use(userRoutes)
app.use(cateRoutes)
app.use(roleRoutes)
app.use(routeRoutes)
app.listen(port)
