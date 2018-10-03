import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {Provider} from 'react-redux';
import store from './redux/store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

// const React = require('react');
// const ReactDOM = require('react-dom');

// it('verifies test suite setup', () => {

//   expect(true).toBe(true);
// });

// describe('simple function test suite', () => {
//   it('tests', () => {
//     expect('something').toBe('something');
//   });

// })