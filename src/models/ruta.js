module.exports = (sequelize, DataTypes) => {

    return sequelize.define('ruta', {
            origen: {
                type: DataTypes.STRING(3),
                primaryKey: true,
                allowNull: false
            },
            destino: {
                type: DataTypes.STRING(3),
                primaryKey: true,
                allowNull: false
            },
            id_avi: {
                type: DataTypes.INTEGER(11),
                allowNull: false
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        }
        );

}