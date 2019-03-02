module.exports = (sequelize, DataTypes) => {

    return sequelize.define('avion_alq', {
            id_avi: {
                type: DataTypes.INTEGER(11),
                primaryKey: true
            },
            id_prov: {
                type: DataTypes.INTEGER(11),
                primaryKey: true
            }
        },
            {
                timestamps: false,
                freezeTableName: true
            }
    );

}