import { DataTypes, Model } from "sequelize";
import sequelize from "../services/sequelize";
import md5 from "md5";
import Users from "./Users";

class Messages extends Model {
}

Messages.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    // from: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // to: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    text: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
  },
  {
    modelName: "messages",
    tableName: "messages",
    sequelize,
  }
);
Messages.belongsTo(Users, {
  foreignKey: 'from',
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'user',
});

Users.hasMany(Messages, {
  foreignKey: 'from',
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'messages',
});

Messages.belongsTo(Users, {
  foreignKey: 'to',
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'friend',
})

Users.hasMany(Messages, {
  foreignKey: 'to',
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'friendMessages',
});

export default Messages;
