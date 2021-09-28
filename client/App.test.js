import React from 'react';
//import renderer from 'react-test-renderer';
import { render } from '@testing-library/react-native';

import App from './App';

// describe('<App />', () => {
//   it('has 5 children', () => {
//     const tree = renderer.create(<App />).toJSON();
//     expect(tree.children.length).toBe(5);
//   });
// });

describe('App component', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })
  it('shout render default opportunity list', () => {
    const { getByText, toJSON } = render(<App />);
    expect(getByText('All projects')).toBeDefined();
    expect(getByText('Saved Projects')).toBeDefined();
    expect(getByText('My Projects')).toBeDefined();
    expect(getByText('Project Title')).toBeDefined();
    expect(getByText('STA internal')).toBeDefined();
    expect(getByText('Lead Test Analyst')).toBeDefined();
    expect(getByText(/The Lead Tester is a/)).toBeDefined();
    // TODO test interaction
    expect(toJSON()).toMatchSnapshot();
  });
});
