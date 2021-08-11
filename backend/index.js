const express = require('express');
const admin = require('firebase-admin');

const app = express();

/**
 * config -firebase
 */
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.get('/posts',  (req, res) => {
  const posts = [];

  db.collection('posts')
    .get()
    .then(snapshot => {
      snapshot.forEach((doc) => {
        posts.push(doc.data());
      });
      return res.send(posts);
    });
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
