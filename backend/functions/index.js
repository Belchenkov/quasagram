const functions = require("firebase-functions");

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.posts = functions.https.onRequest((request, response) => {
  const posts = [
    {
      caption: 'Volga Bridge',
      location: 'Saratov, Russia'
    },
    {
      caption: 'St. Petersburg in spring',
      location: 'St.-Petersburg'
    }
  ];
  response.send(posts);
});
