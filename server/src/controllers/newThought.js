import UserThoughts from '../db/models/UserThoughts';
import mongoose from 'mongoose';

export const newThought = async (req, res) => {
  try {
    const userThoughts = await UserThoughts.findById(req.body._id)
    const thought = {
      text: req.body.text,
      _id: new mongoose.Types.ObjectId
    }
    userThoughts.thoughts.push(thought)
    await userThoughts.save();
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