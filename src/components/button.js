import React, {Component} from 'react';

class Button extends Component {
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

export default Button;
