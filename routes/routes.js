var express = require('express')
var userController = require('../controllers/usuarioController')

var rotas = express.Router()

rotas.post("/cadastrarPessoa", userController.create);
rotas.put("/editarPessoa/:id", userController.update);
rotas.delete("/deletarPessoa/:id", userController.destroy);
rotas.get("/candidatos", userController.findAll);

module.exports = rotas