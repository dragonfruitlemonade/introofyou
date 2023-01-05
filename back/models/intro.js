module.exports = (sequelize, DataTypes) => {
  const Intro = sequelize.define(
    "Intro",
    {
      field: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      major: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      job: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      call: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      income: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      portfolio: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      academic: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      intro: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      skill: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      reason: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      other: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", // 한글 저장
    }
  );
  Intro.associate = (db) => {
    db.Intro.belongsTo(db.User);
    db.Intro.hasMany(db.Post);
  };
  return Intro;
};
