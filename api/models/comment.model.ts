import * as mongoose from 'mongoose';

const attributes = {
  content: {
    type: String
  },
  author: {
    type: String // TODO: add user model
  }
};

export const commentSchema = mongoose.Schema(attributes);
export const Comment = mongoose.model('Comment', commentSchema);

export default Comment;