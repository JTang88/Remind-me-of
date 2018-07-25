import User from '../db/models/User';
import UserThoughts from '../db/models/UserThoughts';

export const findOrCreateUser =  async (req, res) => {
  console.log('here is the _id type', typeof req.body._id)
  const user = await User.findById(req.body._id);
  console.log('here is the user object', user)
  if (user) {
    const thoughts = await UserThoughts.findById(user._id);
    return res.status(200).json({
      sucess: true,
      thoughts,
    });
  } else {
    new User({ _id: req.body._id }).save();
    new UserThoughts({ _id: req.body._id }).save();
    return res.status(200).json({
      sucess: true,
    });
  }
}