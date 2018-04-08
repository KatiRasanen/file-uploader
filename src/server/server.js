const http = require('http');
const fs = require('fs');
const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

// default options
app.use(fileUpload());

app.post('/', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  let uploadedFile = req.files.file;
  console.log(req.files);

  uploadedFile.mv(`./savedFiles/${uploadedFile.name}`, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });

});
app.listen(8080);

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.write('Hello World!');
//
//   const form = new formidable.IncomingForm();
//
//   form.parse(req, function(err, fields, files) {
//     res.writeHead(200, {'content-type': 'text/plain'});
//     res.write('received upload:\n\n');
//     console.log(fields);
//     console.log(files.file.WriteStream);
//     // console.log(util.inspect({fields: fields, files: files}));
//     fs.writeFile(`./savedFile/${fields.name}`, files.file, function(err) {
//       if(err) {
//           return console.log(err);
//       }
//       console.log("The file was saved!");
//     });
//     res.end(); //end the response
//     // res.end(util.inspect({fields: fields, files: files}));
//   });
// }).listen(8080);
//
//
// app.post('/upload', function(req, res) {
//   if (!req.files)
//     return res.status(400).send('No files were uploaded.');
//
//   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//   let sampleFile = req.files.sampleFile;
//
//   // Use the mv() method to place the file somewhere on your server
//   sampleFile.mv('/somewhere/on/your/server/filename.jpg', function(err) {
//     if (err)
//       return res.status(500).send(err);
//
//     res.send('File uploaded!');
//   });
// });
