import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  _id: {
    type: String,
  },
});

const User = mongoose.model('User', UserSchema);

export default User;