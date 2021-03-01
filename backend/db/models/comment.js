'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    eventId: DataTypes.INTEGER
  }, {});
  Comment.associate = function(models) {
    
    Comment.belongsTo(models.User, { foreignKey: 'userId' });
    
    Comment.belongsTo(models.Event, { foreignKey: 'eventId'});
    
  }
  Comment.createComment = async function ({ userId, content, eventId }) {
    const comment = await Comment.create({ userId, content, eventId });
    return await Comment.findByPk(comment.id)
  }
  
  return Comment;
}