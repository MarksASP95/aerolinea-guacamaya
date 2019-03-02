module.exports = (sequelize, DataTypes) => {

    return sequelize.define('azafata', {
            id_emp: {
                type: DataTypes.INTEGER(11),
                primaryKey: true
            },
            salario_aza: {
                type: DataTypes.DECIMAL(10,0),
                primaryKey: true
            }
        },
            {
                timestamps: false,
                freezeTableName: true
            }
    );

}