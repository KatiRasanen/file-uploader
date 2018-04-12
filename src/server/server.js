const http = require('http');
const fs = require('fs');
const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

app.use(fileUpload());

app.post('/', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  let uploadedFile = req.files.file;
  // console.log(req.files);

  uploadedFile.mv(`./savedFiles/${uploadedFile.name}`, function(err) {
    if (err)
      return res.status(500).send(err);
    res.send(`Succesfully uploaded: ${uploadedFile.name}`);
  });
});

app.get('/', function(req, res) {
  console.log(req._parsedUrl.query);
  const fileToDownload = req._parsedUrl.query;
  const filepath = `C:\\dev\\file-uploader\\savedFiles\\${fileToDownload}`
  res.download(filepath);
  console.log(filepath);
  res.send({'download': filepath});
});
app.listen(8080);
