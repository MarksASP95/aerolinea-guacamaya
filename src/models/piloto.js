module.exports = (sequelize, DataTypes) => {

    return sequelize.define('piloto', {
            id_emp: {
                type: DataTypes.INTEGER(11),
                primaryKey: true,
                allowNull: false
            },
            salario_pil: {
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