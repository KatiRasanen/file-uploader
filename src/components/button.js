import React, {Component} from 'react';

class Uploader extends Component {
  render() {
    const {
      onClick,
      disabled,
      text
    } = this.props;

    return (
      <button onClick={onClick} disabled={disabled}>
        {text}
      </button>
    );
  }
}

export default Uploader;
