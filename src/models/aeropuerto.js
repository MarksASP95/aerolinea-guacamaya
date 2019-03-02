module.exports = (sequelize, DataTypes) => {

    return sequelize.define('aeropuerto', {
            id_aer: {
                type: DataTypes.STRING(3),
                primaryKey: true,
                allowNull: false
            },
            nom_ciudad: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            nom_pais: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            dist_pista:{
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