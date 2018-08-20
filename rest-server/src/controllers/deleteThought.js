import User from '../db/models/User';

export const deleteThought = async (req, res) => {
  try {
    const user = await User.findById(req.query.userId)
    user.thoughts.id(req.query.thoughtId).remove();
    user.save();
    return res.status(200).json({
      sucess: true,
    });
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      success: false,
      err,
    });
  }
}