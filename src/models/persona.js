module.exports = (sequelize, DataTypes) => {

    return sequelize.define('persona', {
            id_persona: {
                type: DataTypes.STRING(44),
                primaryKey: true,
                allowNull: false
            },
            nom_persona: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            fec_nac: {
                type: DataTypes.DATE,
                allowNull: false
            },
            sexo:{
                type: DataTypes.ENUM('M', 'F'),
                allowNull: false
            }
        },
            {
                timestamps: false,
                freezeTableName: true
            }
    );

}