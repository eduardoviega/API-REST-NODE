var projeto = require("../models/projeto")

var projetoControlador = {}

projetoControlador.create = function(req, res){
    projeto.create({
        idProjeto: req.body.idProjeto,
        nome: req.body.nome,
        descricao: req.body.descricao,
        dataInicio: req.body.dataInicio,
        dataFim: req.body.dataFim,
    }).then(() => {
        res.sendStatus(200)
    }).catch((erro) => {
        res.status(500).send("Erro no cadastro do Projeto: "+erro)    
    })
}

projetoControlador.findAll = function(req, res){
    projeto.findAll({
        raw: true
    }).then((dados) => {
        res.status(200).send(dados)
    }).catch((erro) => {
        res.status(500).send(`Erro ao buscar os projetos: `+erro)
    })
}

projetoControlador.update = function(req, res){
    projeto.update({
        nome: req.body.nome,
        descricao: req.body.descricao,
        dataFim: req.body.dataFim,
    },{
        where: {
            idProjeto: req.params.id
        }
    }).then(() => {
        res.sendStatus(200)
    }).catch((erro) => {
        res.status(500).send(`Erro ao atualizar o Projeto: `+erro)
    })
}

projetoControlador.destroy = function(req, res){
    projeto.destroy({
        where: {
            idProjeto: req.params.id
        }
    }).then(() => {
        res.sendStatus(200)
    }).catch((erro) => {
        res.status(500).send(`Erro ao remover o projeto: `+erro)
    })
}

module.exports = projetoControlador