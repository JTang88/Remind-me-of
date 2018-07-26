import User from '../db/models/User';
import UserThoughts from '../db/models/UserThoughts';

export const findOrCreateUser =  async (req, res) => {
  try {
    const user = await User.findById(req.body._id);
    if (user) {
      const { thoughts } = await UserThoughts.findById(user._id);
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
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      success: false,
      err,
    });
  }
  
}