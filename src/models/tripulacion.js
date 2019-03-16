module.exports = (sequelize, DataTypes) => {

    return sequelize.define('tripulacion', {
            id_emp: {
                type: DataTypes.INTEGER(11),
                primaryKey: true,
                allowNull: false
            },
            id_vuelo: {
                type: DataTypes.INTEGER(11),
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