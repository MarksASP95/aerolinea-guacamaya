module.exports = (sequelize, DataTypes) => {

    return sequelize.define('mantenimiento', {
            id_mant: {
                type: DataTypes.INTEGER(3),
                primaryKey: true,
                allowNull: false
            },
            nom_mant: {
                type: DataTypes.STRING(20),
                primaryKey: true,
                allowNull: false
            },
            dur_dias: {
                type: DataTypes.INTEGER(3),
                allowNull: false
            }
        },
            {
                timestamps: false,
                freezeTableName: true
            }
    );

}