var localStrategy = require("passport-local").Strategy

//modelo do usuário
var Usuario = require('../models/usuario');

module.exports = function(passport){

    passport.serializeUser((user,done)=>{
        done(null, user.email)
    })
    
    passport.deserializeUser( async (email, done)=>{
        try{
            const user = await Usuario.findOne({
                raw: true,
                where: {
                    email: email
                }})
            done(null, user)
        }catch(erro){
            done(erro, user)
        }
    })
    
    passport.use(new localStrategy({
        usernameField: 'email',
        passwordField: 'senha'
    },
    async (email,senha,done) => {
        try{
            const user = await Usuario.findOne({
                raw: true,
                where: {
                    email: email
                }})

            if(!user){
                return done(null,false,{message:"Esta conta não existe"})
            }
            
            const eValido = senha == user.senha

            if(!eValido) return done(null, false, {message: "Senha incorreta!"})
            
            return done(null, user)
        }catch(erro){
            done(erro, false)
        }
    }))
}