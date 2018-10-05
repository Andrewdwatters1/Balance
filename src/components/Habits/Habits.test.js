import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Habits } from './Habits';

Enzyme.configure({ adapter: new Adapter() })

describe('App Component', () => {
  it('should render without props', () => {
    const app = shallow(<Habits />);
    expect(app).toMatchSnapshot();
  });
});

