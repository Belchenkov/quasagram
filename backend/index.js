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

app.get('/posts', (req, res) => {
  const posts = [

  ];
  return res.send('Server Started!');
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
