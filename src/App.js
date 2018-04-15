import React, { Component } from 'react';
import fileDownload from 'js-file-download';

import Uploader from './components/uploader';
import Button from './components/button';

import './App.css';

export default class App extends Component {

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

    window.fetch('http://localhost:8080', {
      method: 'POST',
      mode: 'no-cors',
      body: data
    }).then(
      this.setState({
        ...this.state,
        enableDownload: true
      })
    )
  }

  onDownloadClick = (event) => {
    let data = new FormData();
    data.append('name', this.state.file.name);

    window.fetch(`http://localhost:8080?${this.state.file.name}`, {
      method: 'GET',
      mode: 'no-cors',
    }).then(response => {
      return response.blob();
    }).then(response => {
      const objectURL = URL.createObjectURL(response);
      console.log(objectURL);
      fileDownload('C:\\dev\\file-uploader\\savedFiles\\test.txt', `${this.state.file.name}`);
    })
  }

  onUploaderChange = (event) => {
    this.setState({
      ...this.state,
      file: event.target.files[0]
    });
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
