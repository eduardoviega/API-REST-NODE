var candidatura = require("../models/candidatura")
const projeto = require("../models/projeto")
const usuario = require("../models/usuario")
var userController = require('../controllers/usuarioController')

var candidaturaController = {}

candidaturaController.createCandidatura = function (req, res) {
    candidatura.create({
        idProjeto: req.params.idprojeto,
        idUsuario: req.params.idusuario,
        aprovado: false
    }).then(() => {
        res.sendStatus(200)
    }).catch((erro) => {
        res.status(500).send("Erro no cadastro da candidatura: " + erro)
    })
}

candidaturaController.findAll = function (req, res) {
    candidatura.findAll({
        raw: true
    }).then((dados) => {
        res.status(200).send(dados)
    }).catch((erro) => {
        res.status(500).send(`Erro ao buscar as candidaturas: ` + erro)
    })
}

candidaturaController.update = function (req, res) {
    candidatura.update({
        idProjeto: req.body.idProjeto,
        idUsuario: req.body.idUsuario,
    }, {
        where: {
            idCandidatura: req.params.id
        }
    }).then(() => {
        res.sendStatus(200)
    }).catch((erro) => {
        res.status(500).send(`Erro ao atualizar a candidatura: ` + erro)
    })
}

candidaturaController.destroy = function (req, res) {
    candidatura.destroy({
        where: {
            idCandidatura: req.params.id
        }
    }).then(() => {
        res.sendStatus(200)
    }).catch((erro) => {
        res.status(500).send(`Erro ao remover a candidatura: ` + erro)
    })
}

candidaturaController.candidatosSelecionados = async function (req, res) {
    try {
        const candidaturasDoProjeto = await candidatura.findAll({
            raw: true,
            where: {
                idProjeto: req.params.id,
                aprovado: true
            }
        });

        const listUsuario = await Promise.all(candidaturasDoProjeto.map(async (cand) => {
            const usuarioCand = await usuario.findOne({
                raw: true,
                where: {
                    idUsuario: cand.idUsuario,
                }
            });
            return { nome: usuarioCand.nome };
        }));

        res.status(200).send(listUsuario);
    } catch (erro) {
        res.status(500).send(`Erro ao buscar as candidatos selecionados: ` + erro);
    }
}

candidaturaController.candidatosInteressados = async function (req, res) {
    try {
        const candidaturasDoProjeto = await candidatura.findAll({
            raw: true,
            where: {
                idProjeto: req.params.id,
                aprovado: false
            }
        });

        const listUsuario = await Promise.all(candidaturasDoProjeto.map(async (cand) => {
            const usuarioCand = await usuario.findOne({
                raw: true,
                where: {
                    idUsuario: cand.idUsuario,
                }
            });
            return { nome: usuarioCand.nome };
        }));

        res.status(200).send(listUsuario);
    } catch (erro) {
        res.status(500).send(`Erro ao buscar as os candidatos interessados: ` + erro);
    }
}

candidaturaController.selecionaCandidato = async function (req, res) {
    try {
        candidatura.update({
            aprovado: true
        }, {
            where: {
                idProjeto: req.params.idprojeto,
                idUsuario: req.params.idusuario
            }
        }).then(() => {
            res.sendStatus(200)
        }).catch((erro) => {
            res.status(500).send(`Erro ao atualizar a candidatura: ` + erro)
        });
    } catch (erro) {
        res.status(500).send(`Erro ao selecionar candidato: ` + erro);
    }
}

module.exports = candidaturaController