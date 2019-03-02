module.exports = (sequelize, DataTypes) => {

    return sequelize.define('empleado', {
            id_emp: {
                type: DataTypes.INTEGER(11),
                primaryKey: true
            },
            id_persona: {
                type: DataTypes.STRING(44),
                allowNull: false
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        }
        );

}