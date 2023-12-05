import React from 'react'
import { renderHook } from '@testing-library/react-native'
import { useFeatureFlags, FeatureFlagsProvider } from './useFeatureFlags'

describe('useFeatureFlags', () => {
  test('uses features config or defaults to false', () => {
    const { result } = renderHook(() => useFeatureFlags(), {
      wrapper: ({ children }) => (
        <FeatureFlagsProvider features={['profileScreen']}>
          {children}
        </FeatureFlagsProvider>
      ),
    })

    expect(result.current).toEqual({
      profileScreen: true,
      events: false,
    })
  })
})
