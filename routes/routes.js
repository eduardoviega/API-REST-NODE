var express = require('express')
var userController = require('../controllers/usuarioController')
var projectController = require('../controllers/projetoController')
var candidaturaController = require('../controllers/candidaturaController')
const passport = require("passport");
const {candidato, responsavel, admin} = require("../helpers/acesso")

var rotas = express.Router()

rotas.post("/cadastrarPessoa", admin, userController.create);
rotas.put("/editarPessoa/:id", admin, userController.update);
rotas.delete("/deletarPessoa/:id", admin, userController.destroy);
rotas.get("/candidatos", admin, userController.findAll);

rotas.post("/cadastrarProjeto", responsavel, projectController.create)
rotas.put("/editarProjeto/:id", responsavel, projectController.update);
rotas.delete("/deletarProjeto/:id", responsavel, projectController.destroy);
rotas.get("/projetos", responsavel, projectController.findAll);
rotas.get("/candidatosInteressados/:id", responsavel, candidaturaController.candidatosInteressados);
rotas.post("/selecionaCandidato/:idprojeto/:idusuario", responsavel, candidaturaController.selecionaCandidato);

rotas.post("/candidatar/:idprojeto/:idusuario", candidato, candidaturaController.createCandidatura);
rotas.get("/candidatosSelecionados/:id", candidato, candidaturaController.candidatosSelecionados);
rotas.delete("/deletarCandidatura/:id", candidato, candidaturaController.destroy);

rotas.post("/logar", (req,res,next) => {
    passport.authenticate("local", {
    })(req,res,next)
})

rotas.get("/logout", (req,res) => {
    req.logout(req.user, erro => {
        if(erro) return next(erro);
        res.sendStatus(200)
    })
})

module.exports = rotas