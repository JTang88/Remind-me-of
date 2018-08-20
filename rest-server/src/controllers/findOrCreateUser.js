import User from '../db/models/User';

export const findOrCreateUser =  async (req, res) => {
  try {
    const user = await User.findById(req.body._id);
    if (user) {
      const { from, to, freq, thoughts, phone } = user
      console.log('here is user.lastTexted', user.lastTexted)
      return res.status(200).json({
        sucess: true,
        thoughts,
        phone,
        from,
        to,
        freq,
      });
    } else {
      new User({ 
        _id: req.body._id, 
        lastTexted: new Date(new Date().getTime() - (24 * 60 * 60 * 1000)), 
        phone: null,
        from: 8,
        to: 20,
        freq: 3,
      }).save();
      return res.status(200).json({
        sucess: true,
        from: 8,
        to: 20,
        freq: 3,
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