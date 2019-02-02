module.exports = (sequelize, DataTypes) => {

    return sequelize.define('city', {
            ID: {
                type: DataTypes.INTEGER(11),
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            Name: {
                type: DataTypes.STRING(35),
                allowNull: false
            },
            CountryCode: {
                type: DataTypes.STRING(3),
                allowNull: false
            },
            District:{
                type: DataTypes.STRING(20),
                allowNull: false
            },
            Population:{
                type: DataTypes.INTEGER(11),
                allowNull: false,
                defaultValue: 0
            }
        },
            {
                timestamps: false,
                freezeTableName: true
            }
    );

}