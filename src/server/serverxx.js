const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const formidable = require('formidable');
const util = require('util');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('Hello World!'); //write a response to the client
  // console.log(req);
  // console.log(req.form);
  // console.log(req.body);
  const form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files) {
    res.writeHead(200, {'content-type': 'text/plain'});
    res.write('received upload:\n\n');
    console.log(fields);
    console.log(files.file.WriteStream);
    // console.log(util.inspect({fields: fields, files: files}));
    fs.writeFile(`./savedFile/${fields.name}`, files.file, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
    });
    res.end(); //end the response
    // res.end(util.inspect({fields: fields, files: files}));
  });
  // console.log(form);
  // req.on('data', chunk => {
  //   console.log('A chunk of data has arrived: ', qs.parse(chunk));
  // // });
  // fs.writeFile("./savedFile/testFile", "Hey there!", function(err) {
  //   if(err) {
  //       return console.log(err);
  //   }
  //
  //   console.log("The file was saved!");
  // });
  // res.end(); //end the response
}).listen(8080); //the server object listens on port 8080



// var formidable = require('formidable'),
//     http = require('http'),
//     util = require('util');
//
// http.createServer(function(req, res) {
//   if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
//     // parse a file upload
//     var form = new formidable.IncomingForm();
//
//     form.parse(req, function(err, fields, files) {
//       res.writeHead(200, {'content-type': 'text/plain'});
//       res.write('received upload:\n\n');
//       res.end(util.inspect({fields: fields, files: files}));
//     });
//
//     return;
//   }
//
//   // show a file upload form
//   res.writeHead(200, {'content-type': 'text/html'});
//   res.end(
//     '<form action="/upload" enctype="multipart/form-data" method="post">'+
//     '<input type="text" name="title"><br>'+
//     '<input type="file" name="upload" multiple="multiple"><br>'+
//     '<input type="submit" value="Upload">'+
//     '</form>'
//   );
// }).listen(8080);
