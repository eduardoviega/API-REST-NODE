var express = require('express')
var userController = require('../controllers/usuarioController')
var projectController = require('../controllers/projetoController')
var candidaturaController = require('../controllers/candidaturaController')

var rotas = express.Router()

rotas.post("/cadastrarPessoa", userController.create);
rotas.put("/editarPessoa/:id", userController.update);
rotas.delete("/deletarPessoa/:id", userController.destroy);
rotas.get("/candidatos", userController.findAll);

rotas.post("/cadastrarProjeto", projectController.create)
rotas.put("/editarProjeto/:id", projectController.update);
rotas.delete("/deletarProjeto/:id", projectController.destroy);
rotas.get("/projetos", projectController.findAll);
rotas.get("/candidatosInteressados", );
rotas.post("/selecionaCandidato/:id", )

rotas.post("/candidatar/:idprojeto/:idusuario", candidaturaController.createCandidatura)
rotas.get("/candidatosSelecionados/:id", candidaturaController.candidatosSelecionados);
rotas.delete("/deletarCandidatura/:id", candidaturaController.destroy);


module.exports = rotas