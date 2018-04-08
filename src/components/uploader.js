import React, {Component} from 'react';

class Uploader extends Component {
  render() {
    return (
      <input type="file" name="file" onChange={this.props.onChange} />
    );
  }
}

export default Uploader;
