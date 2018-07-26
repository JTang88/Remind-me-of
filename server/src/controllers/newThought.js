import UserThoughts from '../db/models/UserThoughts';

export const newThought = async (req, res) => {
  try {
    const userThoughts = await UserThoughts.findById(req.body._id)
    userThoughts.thoughts.push({ text: req.body.text })
    await userThoughts.save();
    res.status(200).json({
      sucess: true,
    })
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      sucess: false,
      err,
    })
  }
  
}