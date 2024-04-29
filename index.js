const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mimeTypes = require('mime-types');
require('dotenv').config()
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const fileName = req.file.originalname;
  const fileType = mimeTypes.lookup(fileName);
  const fileSize = req.file.size;

  res.status(200).json({
    name: fileName,
    type: fileType,
    size: fileSize
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
