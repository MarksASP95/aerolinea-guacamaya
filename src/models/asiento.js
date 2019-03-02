module.exports = (sequelize, DataTypes) => {

    return sequelize.define('asiento', {
            id_alquiler: {
                type: DataTypes.INTEGER(4),
                primaryKey: true,
                
                allowNull: false
            },
            modelo: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            id_mant: {
                type: DataTypes.INTEGER(3),
                allowNull: false
            },
            fec_ult_mant:{
                type: DataTypes.DATE,
            },
            estado: {
                type: DataTypes.STRING(10),
                allowNull: false
            },
            equip_med: {
                type: DataTypes.BOOLEAN
            }
        },
            {
                timestamps: false,
                freezeTableName: true
            }
    );

}