module.exports = (sequelize, DataTypes) => {

    return sequelize.define('boleto', {
            id_reserva: {
                type: DataTypes.INTEGER(11),
                primaryKey: true,
                allowNull: false
            },
            id_pasajero: {
                type: DataTypes.STRING(44),
                primaryKey: true,
                allowNull: false
            },
            cod_asi: {
                type: DataTypes.STRING(4)
            },
            cant_equi: {
                type: DataTypes.INTEGER(2)
            }
        },
            {
                timestamps: false,
                freezeTableName: true
            }
    );

}