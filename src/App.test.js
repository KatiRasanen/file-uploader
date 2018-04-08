import React from 'react';
import ReactDOM from 'react-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import App from './App';
import {expect} from 'chai';

import Toolbar from './components/toolbar';
import Header from './components/header';
import Footer from './components/footer';
import Dropdown from 'react-dropdown';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Main application', function() {
  const renderer = new ShallowRenderer();
  renderer.render(<App />);
  const result = renderer.getRenderOutput();
  it('renders Header and Footer', () => {
    expect(result.props.children[0]).deep.equal(<Header />);
    expect(result.props.children[2]).deep.equal(<Footer />);
  });
});
