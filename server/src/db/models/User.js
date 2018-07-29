import mongoose from 'mongoose';

const ThoughtSchema = mongoose.Schema({
  text: String,
  lastSent: Date,
}, {
    timestamps: true
});

const UserSchema = mongoose.Schema({
  _id: {
    type: String,
  },
  thoughts: [ThoughtSchema],
  lastTexted: Date,
  from: Number,
  to: Number,
  freq: Number,
});

const User = mongoose.model('User', UserSchema);


export default User;