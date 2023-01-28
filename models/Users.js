import { DataTypes, Model } from "sequelize";
import sequelize from "../services/sequelize";
import md5 from "md5";

class Users extends Model {
  static passwordHash = (password) => md5(md5(password) + "234hjh42jh54hj423");
}

Users.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "email",
    },
    password: {
      type: DataTypes.CHAR(32),
      allowNull: true,
      get() {
        return undefined;
      },
      set(val) {
        if (val) {
          this.setDataValue("password", Users.passwordHash(val));
        }
      },
    },
    gender: {
      type: DataTypes.ENUM("f", "m"),
      defaultValue: "m",
      allowNull: true,
    },
    birth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,

    },
  },
  {
    modelName: "users",
    tableName: "users",
    sequelize,
  }
);

export default Users;
