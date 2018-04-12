import React, {Component} from 'react';

class Uploader extends Component {
  render() {
    return (
      <button onClick={this.props.onClick}>
        {this.props.text}
      </button>
    );
  }
}

export default Uploader;
