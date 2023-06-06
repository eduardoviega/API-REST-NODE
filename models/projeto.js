var sequelize = require("sequelize")
var banco = require("./../configs/bancoConfig")

var projeto = banco.define('projeto', {
    idProjeto: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: sequelize.STRING,
        allowNull: false,
    },
    descricao: {
        type: sequelize.STRING,
        allowNull: false,
    },
    dataInicio: {
        type: sequelize.INTEGER,
        allowNull: false,
    },
    dataFim: {
        type: sequelize.INTEGER,
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: false
});

projeto.sync()

module.exports = projeto