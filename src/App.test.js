import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { App } from './App';

Enzyme.configure({ adapter: new Adapter() })

describe('verify environment setup', () => {
  it('equals true', () => {
    expect(true).toBe(true);
  });
});

describe('App Component', () => {
  it('should render without props', () => {
    const app = shallow(<App />);
    expect(app).toMatchSnapshot();
  });
});