import UserThoughts from '../db/models/UserThoughts';

export const deleteThought = async (req, res) => {
  try {
    const userThoughts = await UserThoughts.findById(req.query.userId)
    userThoughts.thoughts.id(req.query.thoughtId).remove();
    userThoughts.save();
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