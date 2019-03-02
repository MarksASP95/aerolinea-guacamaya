module.exports = (sequelize, DataTypes) => {

    return sequelize.define('vuelo', {
            id_vuelo: {
                type: DataTypes.INTEGER(11),
                primaryKey: true
            },
            id_avi: {
                type: DataTypes.INTEGER(11),
                allowNull: false
            },
            origen: {
                type: DataTypes.STRING(3),
                allowNull: false
            },
            destino: {
                type: DataTypes.STRING(3),
                allowNull: false
            },
            fecha: {
                type: DataTypes.DATE,
                allowNull: false
            },
            cancelado: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        }
        );

}