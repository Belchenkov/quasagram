const express = require('express');
const admin = require('firebase-admin');
const inspect = require('util').inspect;
const Busboy = require('busboy');

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
  res.set('Access-Control-Allow-Origin', '*');
  const posts = [];

  db.collection('posts')
    .orderBy('date', 'desc')
    .get()
    .then(snapshot => {
      snapshot.forEach((doc) => {
        posts.push(doc.data());
      });
      return res.send(posts);
    });
});

app.post('/posts',  (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const busboy = new Busboy({ headers: req.headers });

  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
    file.on('data', function(data) {
      console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
    });
    file.on('end', function() {
      console.log('File [' + fieldname + '] Finished');
    });
  });

  busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
    console.log('Field [' + fieldname + ']: value: ' + inspect(val));
  });

  busboy.on('finish', function() {
    console.log('Done parsing form!');
    //res.writeHead(303, { Connection: 'close', Location: '/' });
    res.end();
  });

  req.pipe(busboy);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
