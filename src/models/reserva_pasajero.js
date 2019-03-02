module.exports = (sequelize, DataTypes) => {

    return sequelize.define('reserva_pasajero', {
            id_reserva: {
                type: DataTypes.INTEGER(11),
                primaryKey: true,
                allowNull: false
            },
            id_pasajero: {
                type: DataTypes.STRING(44),
                primaryKey: true,
                allowNull: false
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        }
        );

}