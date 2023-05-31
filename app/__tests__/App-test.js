/**
 * @file Jest test for App.tsx
 */

// TODO: Jest needs to be properly set up for this to work

import 'react-native'
import React from 'react'
import App from '../App'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  renderer.create(<App />)
})
