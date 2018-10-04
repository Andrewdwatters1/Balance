import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';

import store from '../../redux/store';
import Habits from './Habits';

Enzyme.configure({ adapter: new Adapter() })

describe('Habit component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <Habits />
      </Provider>
      , div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

