import UserThoughts from '../db/models/UserThoughts';

export const updateThought = async (req, res) => {
  try {
    console.log('here is userId', req.body.userId)
    console.log('here is  req.body.text', req.body.text)
    const userThoughts = await UserThoughts.findById(req.body.userId)
    const thought = userThoughts.thoughts.id(req.body.thoughtId)
    thought.text = req.body.text;
    userThoughts.save();
    console.log('here is thought after update', thought)
    return res.status(200).json({
      sucess: true,
      thought
    });
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      success: false,
      err,
    });
  }
}