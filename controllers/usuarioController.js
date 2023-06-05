var usuario = require("../models/usuario")

var usuarioControlador = {}

usuarioControlador.create = function(req, res){
    usuario.create({
        idUsuario: req.body.idUsuario,
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        tipoUsuario: req.body.tipoUsuario
    }).then(() => {
        res.sendStatus(200)
    }).catch((erro) => {
        res.status(500).send("Erro no cadastro do usuario: "+erro)    
    })
}

usuarioControlador.findAll = function(req, res){
    usuario.findAll({
        raw: true
    }).then((dados) => {
        res.status(200).send(dados)
    }).catch((erro) => {
        res.status(500).send(`Erro ao buscar os usuarios: `+erro)
    })
}

usuarioControlador.update = function(req, res){
    usuario.update({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
    },{
        where: {
            idUsuario: req.params.id
        }
    }).then(() => {
        res.sendStatus(200)
    }).catch((erro) => {
        res.status(500).send(`Erro ao atualizar o usuario: `+erro)
    })
}

usuarioControlador.destroy = function(req, res){
    usuario.destroy({
        where: {
            idUsuario: req.params.id
        }
    }).then(() => {
        res.sendStatus(200)
    }).catch((erro) => {
        res.status(500).send(`Erro ao remover o usuario: `+erro)
    })
}

module.exports = usuarioControlador