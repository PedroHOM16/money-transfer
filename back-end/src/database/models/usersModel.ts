import { Model, INTEGER, STRING } from 'sequelize';
import db from './index.js';

import Accounts from './accountsModel.js'

class Users extends Model {
    declare id: number;
    declare username: string;
    declare password: string;
    declare accountId: number;
    static associate: (models: any) => void;
}

Users.init({
    id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: STRING(50),
        allowNull: false,
    },
    password: {
        type: STRING(50),
        allowNull: false,
    },
    accountId: {
        type: INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'accounts',
          key: 'id',
        },
    },
    }, {
    sequelize: db,
    modelName: 'users',
    timestamps: false,
});

Users.associate = (models) => {
Users.hasOne(models.Accounts, { foreignKey: 'accountId', as: 'id'});
Accounts.belongsTo(models.Users, {foreignKey: 'accountId', as: 'id'});

}

export default Users;