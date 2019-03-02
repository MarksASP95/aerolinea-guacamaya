module.exports = (sequelize, DataTypes) => {

    return sequelize.define('proveedor', {
            id_prov: {
                type: DataTypes.INTEGER(4),
                primaryKey: true
            },
            nom_prov: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            tie_resp_dias: {
                type: DataTypes.INTEGER(2),
                allowNull: false
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        }
        );

}