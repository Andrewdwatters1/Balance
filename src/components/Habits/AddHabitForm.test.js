import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AddHabitForm from './AddHabitForm';

Enzyme.configure({ adapter: new Adapter() })

describe('verify environment setup', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AddHabitForm />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('should render without props', () => {
    const app = shallow(<AddHabitForm />);
    expect(app).toMatchSnapshot();
  });
  it('should render child components', () => {
    const app = shallow(<AddHabitForm />);
    expect(app.exists()).toBe(true);
    expect(app.children().length).toBe(2);
  });
});


