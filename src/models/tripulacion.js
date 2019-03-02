module.exports = (sequelize, DataTypes) => {

    return sequelize.define('tripulacion', {
            id_emp: {
                type: DataTypes.INTEGER(11),
                primaryKey: true,
                allowNull: false
            },
            id_persona: {
                type: DataTypes.STRING(44),
                primaryKey: true,
                allowNull: false
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        }
        );

}