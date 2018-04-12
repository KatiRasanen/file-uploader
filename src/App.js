import React, { Component } from 'react';
import Uploader from './components/uploader';
import Button from './components/button';

import fileDownload from 'js-file-download';

import './App.css';

class App extends Component {

  static propTypes = {

  }

  constructor() {
    super();
    this.state = {
      file: undefined,
      enableDownload: false
    }
  }

  onUploadClick = (event) => {
    let data = new FormData();
    data.append('file', this.state.file);
    data.append('name', this.state.file.name);

    fetch('http://localhost:8080', {
      method: 'POST',
      mode: 'no-cors',
      body: data
    })
    .then(
      this.setState({
        ...this.state,
        enableDownload: true
      })
    )
  }

  onUploaderChange = (event) => {
    this.setState({
      ...this.state,
      file: event.target.files[0]
    });
  }

  onDownloadClick = (event) => {
    let data = new FormData();
    data.append('name', this.state.file.name);

    fetch(`http://localhost:8080?${this.state.file.name}`, {
      method: 'GET',
      mode: 'no-cors',
    }).then(response => {
      return response.blob();
    }).then(response => {
      console.log(URL);
      const objectURL = URL.createObjectURL(response);
      console.log(objectURL);
      fileDownload('C:\\dev\\file-uploader\\savedFiles\\bday.png', `${this.state.file.name}`);
    })
  }

  render() {
    return (
      <div className="uploader-container">
        <div className="field">
          <Uploader onChange={this.onUploaderChange} />
        </div>
        <div className="field">
          <Button onClick={this.onUploadClick} text="Upload" disabled={!this.state.file} />
          {this.state.enableDownload && <Button text="Download" onClick={this.onDownloadClick} />}
        </div>
      </div>
    );
  }
}

export default App;
