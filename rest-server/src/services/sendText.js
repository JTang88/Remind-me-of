import User from '../db/models/User'
import twilio from 'twilio';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_ACCESS_TOKEN)

const hours = [3800000, 7200000, 10800000]

// const hours = [38000, 72000, 10800]


const randomPick = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}
// SetTimeOut for every 1 - 3 hours 
setInterval(async () => {
  console.log('in setInterval now')
  const users = await User.find({ phone: { $ne: null } })
  // for every user
  users.forEach((user) => {
    // find user's reminds settings
    const { from, to, freq, lastTexted, phone } = user;
    const now = new Date();
    const passed = (now.getTime() - lastTexted.getTime()) / 1000 / 60 / 60 > freq
    // if now is between the time user reminder setting allows and pass the min hours since user.lastTouch
    if (now.getHours() > from && now.getHours() < to && lastTexted && passed) {
      // iterate throught all thoughts that and extract the ones that are not lastSend in the 72 hours
      const freshThoughts = user.thoughts.filter(thought =>
        (now.getTime() - thought.lastSent.getTime()) / 1000 / 60 / 60 > 12 // 12 hours ago as a start
      )
      // pick a random one sends a text message to user 
      if (freshThoughts.length > 0) {
        const thought = randomPick(freshThoughts)
        // console.log('test it to user to thought', thought);
        client.messages.create({
          to: `+1${phone}`,
          from: process.env.TWILIO_NUMBER,
          body: thought.text
        }).then((message) => console.log(message.sid))

        // update lastSent for the thoughts
        thought.lastSent = now
        user.lastTexted = now
        user.save();
      }
     
    }
  })
}, randomPick(hours)) 


// randomPick(hours)

// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_ACCESS_TOKEN)

// client.messages.create({
//   to: '+13109679501',
//   from: '+15622685503',
//   body: 'test message'
// }).then((message) => console.log(message.sid))


// import User from '../db/models/User'


// const hours = [3600000, 7200000, 10800000]

// const randomPick = (array) => {
//   return array[Math.floor(Math.random() * array.length)]
// }
// // SetTimeOut for every 1 - 3 hours 
// setInterval(async () => {
//   console.log('in setInterval now')
//   const users = await User.find({}) 
//   // for every user
//   users.forEach((user) => {
//     // find user's reminds settings
//     const { from, to, freq, lastTexted } = user;
//     const now = new Date();
//     const passed = (now.getTime() - lastTexted.getTime())/1000/60/60 > freq
//     // if now is between the time user reminder setting allows and pass the min hours since user.lastTouch
//     if (now.getHours() > from && now < to && lastTexted && passed) {
//       // iterate throught all thoughts that and extract the ones that are not lastSend in the 72 hours
//       const freshThoughts = user.thoughts.filter(thought => 
//         (now.getTIme() - thought.lastSent.getTime())/1000/60/60 > 12 // 12 hours ago as a start
//       )
//       // pick a random one sends a text message to user 
//       console.log('test it to user to thought', randomPick(freshThoughts));
//     }
//   })   
// }, randomPick(hours)) 













 // for every 1 - 3 hours
  // for every userThoughts
    // find user's reminds settings
    // if now is between the time user reminder setting allows and pass the min hours since user.lastTouch
      // iterate throught all thoughts that and extract the ones that are not lastSend in the 72 hours
      // pick a random one sends a text message to user 

