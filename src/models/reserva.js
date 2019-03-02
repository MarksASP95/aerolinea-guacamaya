module.exports = (sequelize, DataTypes) => {

    return sequelize.define('reserva', {
            id_reserva: {
                type: DataTypes.INTEGER(11),
                primaryKey: true
            },
            fec_res: {
                type: DataTypes.DATE,
                allowNull: false
            },
            costo: {
                type: DataTypes.DECIMAL(10,0),
                allowNull: false
            },
            id_comprador: {
                type: DataTypes.STRING(44),
                allowNull: false
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        }
        );

}