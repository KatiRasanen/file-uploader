import React, { Component } from 'react';

import Uploader from './components/uploader';
import Button from './components/button';

import PropTypes from 'prop-types';

import './App.css';

const CLASS_NAMES = {
}

class App extends Component {

  static propTypes = {

  }

  constructor() {
    super();
    this.state = {
      file: null
    }
  }

  onClick = (event) => {
    event.preventDefault();
    let data = new FormData();
    data.append('file', this.state.file);
    data.append('name', this.state.file.name);
    // console.log(data);
    fetch('http://localhost:8080', {
      method: 'POST',
      mode: 'no-cors',
      body: data
    }).then(response => {
        console.log(response);
        return response;
    }).then(
      success => console.log(success) // Handle the success response object
    ).catch(
      error => console.log(error) // Handle the error response object
    );

  }

  onUploaderChange = (event) => {
    // console.log(event.target.files);
    this.setState({file: event.target.files[0]});
    // this.setState({file: event.target.value})
  }

  render() {

    return (
      <div>
        <Uploader onChange={this.onUploaderChange} />
        <Button onClick={this.onClick} />
      </div>
    );
  }
}

export default App;
