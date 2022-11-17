/**
 * @file displays the project scope document 
 */

import React, { FC } from 'react'
import { Route, View } from 'react-native'
import { useTheme } from '@/Hooks'
import { WebView } from 'react-native-webview';

interface ProjectScopeProps {
  route: Route
}

/**
 * Displays the project scope if a valid url is passed in
 * @param {Route} route object containing url
 * @returns {WebView} view of the scope pdf in url
 */
const ProjectScope: FC<ProjectScopeProps> = ({ route }) => {
  const { Layout } = useTheme()
  const pdf = route.params.pdf
  return (
    <View style={Layout.flex1}>
      <WebView
      source={{ uri: pdf}}
      />
    </View>
  )
}

export default ProjectScope
