module.exports = (sequelize, DataTypes) => {

    return sequelize.define('itinerario', {
            id_reserva: {
                type: DataTypes.INTEGER(11),
                primaryKey: true,
                allowNull: false
            },
            id_vuelo: {
                type: DataTypes.INTEGER(11),
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