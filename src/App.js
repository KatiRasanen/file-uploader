import React, { Component } from 'react';
import axios from 'axios';
import Uploader from './components/uploader';
import Button from './components/button';

import PropTypes from 'prop-types';
import fileDownload from 'js-file-download';

import './App.css';

const CLASS_NAMES = {
}

class App extends Component {

  static propTypes = {

  }

  constructor() {
    super();
    this.state = {
      file: null,
      enableDownload: false
    }
  }

  onUploadClick = (event) => {
    event.preventDefault();
    let data = new FormData();
    data.append('file', this.state.file);
    data.append('name', this.state.file.name);

    fetch('http://localhost:8080', {
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

  onUploaderChange = (event) => {
    this.setState({
      ...this.state,
      file: event.target.files[0]
    });
  }

  onDownloadClick = (event) => {
    let data = new FormData();
    data.append('name', this.state.file.name);
    // axios.get(`http://localhost:8080`, {
    //   method: 'GET',
    //   url: `?${this.state.file.name}`,
    //   mode: 'no-cors',
    // })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    fetch(`http://localhost:8080?${this.state.file.name}`, {
      method: 'GET',
      mode: 'no-cors',
    }).then(response => {
      console.log(response);
      return response.blob();
    }).then(response => {
      var objectURL = URL.createObjectURL(response);
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
          <Button onClick={this.onUploadClick} text="Upload" />
          {this.state.enableDownload && <Button text="Download" onClick={this.onDownloadClick} />}
        </div>
      </div>
    );
  }
}

export default App;
