// run a interval timer every 24 hours, 
  //to check sentIN24 the value(time) of each id,
    // if now is more 24 hours later, delete id prop

// for every 12 hours
  // for every userThoughts
    // find it's reminds settings
    // run setInterval function based on user's reminder setting
      // if now is between the time user reminder setting allows
        // iterate throught all thoughts that and extract the ones that are not their id is not in the sentIN24 obj.lastSend in the 24 hours
        // pick a random one sends a text message to user 
