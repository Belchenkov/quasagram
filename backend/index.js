const express = require('express');

const app = express();

app.get('/posts', (req, res) => {
  const posts = [

  ];
  return res.send('Server Started!');
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
