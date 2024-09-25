const express = require('express');
const path = require('path');
const app = express();

// Serve static files (like images)
app.use(express.static(path.join(__dirname, 'public')));

// Time-based restriction
app.get('/image/:id', (req, res) => {
  const currentTime = new Date().getTime();
  const timeLimit = 2 * 24 * 60 * 60 * 1000; // 2 days

  if (currentTime - req.session.startTime > timeLimit) {
    return res.status(403).send('Access to this image has expired.');
  }

  // Serve the image if within time limit
  res.sendFile(path.join(__dirname, 'public', 'images', req.params.id));
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
