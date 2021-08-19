import { DataTypes, Model, Sequelize, Optional } from "sequelize";

interface TemplateAttributes {
  id: number;
  title: string;
  desc: string;
}
interface TemplateCreationAttributes extends Optional<TemplateAttributes, "id"> { }


export class Template extends Model<TemplateAttributes, TemplateCreationAttributes> {
  public id!: number;
  public title!: string;
  public desc!: string;
}

export const initialise = (sequelize: Sequelize) => {
  Template.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize, modelName: "Template"
  });
}
