module.exports = (sequelize, DataTypes) => {

    return sequelize.define('vuelo_desv', {
            id_vuelo: {
                type: DataTypes.INTEGER(11),
                primaryKey: true,
                allowNull: false
            },
            nuevo_dest: {
                type: DataTypes.STRING(3),
                allowNull: false
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        }
        );

}