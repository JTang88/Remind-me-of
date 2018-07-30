import mongoose from 'mongoose';

const ThoughtSchema = mongoose.Schema({
  text: String,
  lastSent: Date,
  createdAt: Date,
  updatedAt: Date,
});

const UserSchema = mongoose.Schema({
  _id: {
    type: String,
  },
  phone: String,
  thoughts: [ThoughtSchema],
  lastTexted: Date,
  from: Number,
  to: Number,
  freq: Number,
});

const User = mongoose.model('User', UserSchema);


export default User;