import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

const UserSchema = mongoose.Schema({
  _id: {
    type: String,
  },
});

UserSchema.plugin(timestamps);
const User = mongoose.model('User', UserSchema);


export default User;