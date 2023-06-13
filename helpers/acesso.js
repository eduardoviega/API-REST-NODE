module.exports = {
    candidato: function(req,res,next){
        if(req.isAuthenticated() && req.user.tipoUsuario == 0){
            return next()
        }
        res.send("Você não tem acesso")
    },
    responsavel: function(req,res,next){
        if(req.isAuthenticated() && req.user.tipoUsuario == 1){
            return next()
        }
        res.send("Você não tem acesso")
    },
    admin: function(req,res,next){
        if(req.isAuthenticated() && req.user.tipoUsuario == 2){
            return next()
        }
        res.send("Você não tem acesso")
    },
    isCandidato: (req) => req.isAuthenticated() && req.user.tipoUsuario == 0,
    isResponsavel: (req) => req.isAuthenticated() && req.user.tipoUsuario == 1,
    isAdmin: (req) => req.isAuthenticated() && req.user.tipoUsuario == 2,
}