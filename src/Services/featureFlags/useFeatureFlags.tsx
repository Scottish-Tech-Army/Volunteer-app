import React, { createContext, useContext, useEffect, useState } from 'react'

export enum FeatureFlags {
  'profileScreen' = 'profileScreen',
  'events' = 'events',
  'login' = 'loginScreen',
}

type FeatureFlagsType = {
  [key in keyof typeof FeatureFlags]: boolean
}

interface FeatureFlagsContextType {
  features: FeatureFlagsType
}

const defaultFeatures = Object.keys(FeatureFlags).reduce(
  (acc, key) => ({
    ...acc,
    [key]: false,
  }),
  {} as FeatureFlagsType,
)

export const FeatureFlagsContext = createContext<FeatureFlagsContextType>({
  features: defaultFeatures,
})

export const useFeatureFlags = () => {
  const { features } = useContext(FeatureFlagsContext)
  return features
}

export const FeatureFlagsProvider = ({
  features,
  children,
}: {
  features: string[]
  children?: React.ReactNode
}) => {
  console.log(features)
  const [context, setContext] = useState<FeatureFlagsType>(defaultFeatures)

  useEffect(() => {
    setContext(
      Object.keys(FeatureFlags).reduce(
        (acc, key) => ({
          ...acc,
          [key]: features.includes(key),
        }),
        {} as FeatureFlagsType,
      ),
    )
  }, [features])

  return (
    <FeatureFlagsContext.Provider value={{ features: context }}>
      {children}
    </FeatureFlagsContext.Provider>
  )
}
