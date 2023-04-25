import { Model, INTEGER, DECIMAL } from 'sequelize';
import db from './index.js';

// import Users from './usersModel'

class Accounts extends Model {
    declare id: number;
    declare balance: number;
    // static associate: (models: any) => void;
}

Accounts.init({
    id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    balance: {
        type: DECIMAL(10, 2),
        allowNull: false,
    },
    }, {
    sequelize: db,
    modelName: 'accounts',
    tableName: 'accounts',
    timestamps: false,
});

// Accounts.associate = (models) => {
// Accounts.belongsTo(Users, {foreignKey: 'id', as: 'accountId'});
// };


export default Accounts;