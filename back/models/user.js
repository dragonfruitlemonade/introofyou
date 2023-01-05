module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100), // 넉넉히 넣자, 암호화
      allowNull: false, // 필수정보인지
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.hasOne(db.Intro);
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
  };
  return User;
}