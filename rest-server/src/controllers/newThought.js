import User from '../db/models/User';
import mongoose from 'mongoose';

export const newThought = async (req, res) => {
  try {
    const user = await User.findById(req.body._id)
    const thought = {
      text: req.body.text,
      _id: new mongoose.Types.ObjectId,
      lastSent: new Date(new Date().getTime() - (24 * 60 * 60 * 1000)),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    user.thoughts.push(thought)
    await user.save();
    res.status(200).json({
      sucess: true,
      thought,
    })
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      sucess: false,
      err,
    })
  }
  
}