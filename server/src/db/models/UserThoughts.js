import mongoose from 'mongoose';

const ThoughtSchema = mongoose.Schema({
  text: String,
});

const UserThoughtsSchema = mongoose.Schema({
  _id: {
    type: String,
  },
  thoughts: [ThoughtSchema]
});

const UserThoughts = mongoose.model('UserThoughts', UserThoughtsSchema);

export default UserThoughts;