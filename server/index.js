const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session')
const check = require('./middlewares/checkForSession').check
const swag = require('./controllers/swag_controller')
const auth = require('./controllers/auth_controller')
const cart = require('./controllers/cart_controller')

require('dotenv').config()

let app = express();

app.use(bodyParser.json());

app.use(session({ 
 resave: true,
 saveUninitialized: false,
 secret: process.env.SECRET_SESSION
}))

app.use(check)


//user handling
app.post('/api/login', auth.login)
app.post('/api/register', auth.register)
app.post('/api/signout', auth.signout)
app.get('/api/user', auth.getUser)


//cart handling
app.post('/api/cart', cart.add)
app.post('/api/cart/checkout', cart.checkout)
app.delete('/api/cart', cart.delete)

//swag handling
app.get('/api/swag', swag.read)

const port = 5000;
app.listen(port, console.log(`Goliath online. ${port}`))
