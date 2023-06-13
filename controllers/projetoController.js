var projeto = require("../models/projeto")
var candidatura = require("../models/candidatura")

var projetoControlador = {}

projetoControlador.create = function (req, res) {
    projeto.create({
        idProjeto: req.body.idProjeto,
        nome: req.body.nome,
        descricao: req.body.descricao,
        dataInicio: req.body.dataInicio,
        dataFim: req.body.dataFim,
        popularidade: 0
    }).then(() => {
        res.sendStatus(200)
    }).catch((erro) => {
        res.status(500).send("Erro no cadastro do Projeto: " + erro)
    })
}

projetoControlador.findAll = async function (req, res) {
    try {
        const projetos = await projeto.findAll({
            raw: true
        });

        const promises = projetos.map(async (proj) => {
            const candidaturas = await candidatura.findAll({
                raw: true,
                where: {
                    idProjeto: proj.idProjeto,
                    aprovado: true
                }
            });
            proj.popularidade = candidaturas.length;
        });

        await Promise.all(promises);

        res.status(200).send(projetos);
    } catch (erro) {
        res.status(500).send(`Erro ao buscar os projetos: ` + erro);
    }
}


projetoControlador.update = function (req, res) {
    projeto.update({
        nome: req.body.nome,
        descricao: req.body.descricao,
        dataFim: req.body.dataFim,
    }, {
        where: {
            idProjeto: req.params.id
        }
    }).then(() => {
        res.sendStatus(200)
    }).catch((erro) => {
        res.status(500).send(`Erro ao atualizar o Projeto: ` + erro)
    })
}

projetoControlador.destroy = function (req, res) {
    candidatura.findAll({
        raw: true,
        where: {
            idProjeto: req.params.id
        }
    }).then((candidaturas) => {
        if (candidaturas == null) {
            projeto.destroy({
                where: {
                    idProjeto: req.params.id
                }
            }).then(() => {
                res.sendStatus(200)
            }).catch((erro) => {
                res.status(500).send(`Erro ao remover o projeto: ` + erro)
            })
        }
        res.sendStatus(200)
    }).catch((erro) => {
        res.status(500).send(`Erro ao buscar as candidaturas: ` + erro)
    })
}

module.exports = projetoControlador