import React, {Component} from 'react';

class Uploader extends Component {
  render() {
    return (
      <button onClick={this.props.onClick}>
        Submit
      </button>
    );
  }
}

export default Uploader;
