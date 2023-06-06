var sequelize = require("sequelize")
var banco = require("./../configs/bancoConfig")
const projeto = require("../models/projeto")
const usuario = require("../models/usuario")

var candidatura = banco.define('candidatura', {
    idCandidatura: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    aprovado: {
        type: sequelize.BOOLEAN,
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: false
});

usuario.hasOne(candidatura, { foreignKey: "idUsuario" });
projeto.hasOne(candidatura, { foreignKey: "idProjeto" });

candidatura.sync()

module.exports = candidatura