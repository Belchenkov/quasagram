const express = require('express');
const admin = require('firebase-admin');
const inspect = require('util').inspect;
const Busboy = require('busboy');
const path = require('path');
const os = require('os');
const fs = require('fs');
const UUID = require('uuid-v4');

const app = express();

/**
 * config -firebase
 */
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "quasagram-6e55e.appspot.com"
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

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
  const fields = {};
  let fileData = {};
  const uuid = UUID();

  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
    const filePath = path.join(os.tmpdir(), filename);

    file.pipe(fs.createWriteStream(filePath));
    fileData = { filePath, mimetype };
  });

  busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
    //console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    fields[fieldname] = val;
  });

  busboy.on('finish', function() {
    const { id, caption, location, date } = fields;

    bucket.upload(fileData.filePath, {
      uploadType: 'media',
      metadata: {
        metadata: {
          contentType: fileData.mimetype,
          firebaseStorageDownloadTokens: uuid
        }
      }
    },
(err, uploadFile) => {
        if (!err) {
          createDocument(uploadFile);
        }
      }
    );

    function createDocument(file) {
      db.collection('posts')
        .doc(id)
        .set({
          id,
          caption,
          location,
          date: parseInt(date),
          imageUrl: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${file.name}?alt=media&token=${uuid}`
        })
        .then(() => {
          return res.send('Post added: ' + fields.id);
        });
    }
  });

  req.pipe(busboy);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
