import React from 'react';
import renderer from 'react-test-renderer';

import App from './App';

describe('<App />', () => {
  it('has 5 children', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(5);
  });
});
