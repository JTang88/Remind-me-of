import UserThoughts from '../db/models/UserThoughts';

export const newThought = async (req, res) => {
  const userThoughts = await UserThoughts.findById(req.body._id) 

  console.log('here is req.body.text', req.body.text)
  userThoughts.thoughts.push({ text: req.body.text })
  await userThoughts.save();
  console.log('here is the updated userThoughts', userThoughts)
  res.status(200).json({
    sucess: true,
  })
}