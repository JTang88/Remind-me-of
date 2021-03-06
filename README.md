# Developer Documentation

This application is composed of sub applications client, rest-server and socket-server all self contained within their own folders; They all have their own independent `package.json` dependency management.

# Getting Started

In order to get the app started for development, a few key steps are needed.

* Install [MongoDB](https://www.mongodb.com/) & make sure you have a local mongo server instance running.

* Copy the sample env config object

```bash
cp config/env.sample.js config/env.js
```

* Install Dependencies and Run Setup Scripts

```bash
yarn
yarn setup
yarn env development
```

* Before starting ther application, go to https://www.twilio.com/ to get a sid, a token and a phone number, and then go to https://developers.facebook.com/ to get a appId. Lastly go to the .env files in both client and rest-server folder and insert them where they belong.

* Start the application

```bash
yarn start:server # in one window
yarn start:client # in another window
```


