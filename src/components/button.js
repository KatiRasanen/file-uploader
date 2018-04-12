import React, {Component} from 'react';

class Uploader extends Component {
  render() {
    return (
      <button onClick={this.props.onClick} disabled={this.props.disabled}>
        {this.props.text}
      </button>
    );
  }
}

export default Uploader;
