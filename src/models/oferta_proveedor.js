module.exports = (sequelize, DataTypes) => {

    return sequelize.define('oferta_proveedor', {
            id_prov: {
                type: DataTypes.INTEGER(11),
                primaryKey: true,
                allowNull: false
            },
            modelo: {
                type: DataTypes.STRING(20),
                primaryKey: true,
                allowNull: false
            },
            costo_km: {
                type: DataTypes.DECIMAL(10,0),
                allowNull: false
            }
        },
            {
                timestamps: false,
                freezeTableName: true
            }
    );

}