import { DataTypes, Model } from "sequelize";
import sequelize from "../services/sequelize";
import Users from "./Users";

class Notes extends Model {}

Notes.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
  },
  {
    modelName: "notes",
    tableName: "notes",
    sequelize,
  }
);

Notes.belongsTo(Users, {
  foreignKey: "userId",
});

Users.hasOne(Notes, {
  foreignKey: "userId",
  as: "note",
});
Users.hasMany(Notes, {
  foreignKey: "userId",
  as: "notes",
});

export default Notes;
