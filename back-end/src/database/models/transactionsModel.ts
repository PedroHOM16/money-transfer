import { Model, INTEGER, DECIMAL, DATE, NOW } from 'sequelize';
import db from './index.js';
import Accounts from './accountsModel.js';

class Transactions extends Model {
  declare id: number;
  declare debitedAccountId: number;
  declare creditedAccountId: number;
  declare value: number;
  declare createdAt: Date;
  static associate: (models: any) => void;
}

Transactions.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  debitedAccountId: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: 'users',
      key: 'accountId',
    },
  },
  creditedAccountId: {
    type: INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: 'users',
      key: 'accountId',
    },
  },
  value: {
    type: DECIMAL(10,2),
    allowNull: false,
  },
  createdAt: {
    type: DATE,
    defaultValue: NOW,
  },
}, {
  sequelize: db,
  modelName: 'transactions',
  timestamps: false,
});
Transactions.associate = (models) => {
Transactions.belongsTo(models.Accounts, { foreignKey: 'debitedAccountId'});
Transactions.belongsTo(models.Accounts, { foreignKey: 'creditedAccountId'});

Accounts.hasMany(models.Transactions, { foreignKey: 'debitedAccountId' })
Accounts.hasMany(models.Transactions, { foreignKey: 'creditedAccountId' })
}

export default Transactions;