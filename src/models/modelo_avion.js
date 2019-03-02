module.exports = (sequelize, DataTypes) => {

    return sequelize.define('modelo_avion', {
            modelo: {
                type: DataTypes.STRING(20),
                primaryKey: true,
                allowNull: false
            },
            fabricante: {
                type: DataTypes.STRING(20),
                primaryKey: true,
                allowNull: false
            },
            vel_max: {
                type: DataTypes.DECIMAL(10,0)
            },
            vel_cru: {
                type: DataTypes.DECIMAL(10,0)
            },
            peso_vac: {
                type: DataTypes.DECIMAL(10,0)
            },
            peso_max_equi: {
                type: DataTypes.DECIMAL(10,0)
            },
            peso_max_cab: {
                type: DataTypes.DECIMAL(10,0)
            },
            tipo_comb: {
                type: DataTypes.STRING(15)
            },
            cant_comb: {
                type: DataTypes.DECIMAL(10,0)
            },
            cant_ban: {
                type: DataTypes.INTEGER(2)
            },
            cant_sal_eme: {
                type: DataTypes.INTEGER(2)
            },
            dist_des: {
                type: DataTypes.DECIMAL(10,0),
                allowNull: false
            },
            dist_ate: {
                type: DataTypes.DECIMAL(10,0),
                allowNull: false
            },
            dist_des_car_max: {
                type: DataTypes.DECIMAL(10,0),
                allowNull: false
            },
            internet: {
                type: DataTypes.BOOLEAN
            },
            tv: {
                type: DataTypes.BOOLEAN
            }
        },
            {
                timestamps: false,
                freezeTableName: true
            }
    );

}