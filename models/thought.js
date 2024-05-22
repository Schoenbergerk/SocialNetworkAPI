const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText:{
      type: String,
      required: true,
      minLengthL: 1,
      maxLength: 280,
    },
    createdAt:{
      type: Date,
      default: Date.now,
      get: (timeStamp) => new Date(timeStamp).toLocaleString(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;