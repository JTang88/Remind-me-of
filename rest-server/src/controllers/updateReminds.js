import User from '../db/models/User';

export const updateReminds = async ({ body: { _id, from, to, freq, phone } }, res) => {
  try {
    const data = await User.findByIdAndUpdate(_id, { from, to, freq, phone })
    console.log(data)
    return res.status(200).json({
      sucess: true,
      from: from,
      to: to,
      freq: freq,
      phone: phone,
    });
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      success: false,
      err,
    });
  }
}