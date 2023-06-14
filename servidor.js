var express = require("express")
var rotas = require('./routes/routes')
var session = require("express-session")
var passport = require("passport")
const swaggerUI = require("swagger-ui-express")
require("./configs/security")(passport)

var aplicacao = express()
var PORTA = 80

aplicacao.use(session({
    secret: "provanode",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 60 * 1000} //30min
}))
aplicacao.use(passport.initialize())
aplicacao.use(passport.session())

//Midleware
aplicacao.use((req,res, next) => {
    res.locals.user = req.user || null
    next()
})

const swaggerDocument = require('./swagger.json');

aplicacao.use(express.urlencoded({extended: true}))
aplicacao.use("/api-docs",swaggerUI.serve, swaggerUI.setup(swaggerDocument));
aplicacao.use(rotas)

aplicacao.listen(PORTA, function(){
    console.log(`Servidor http rodando na porta ${PORTA}...`);
})