/**
 * @file Project Scope
 */

import PDFView from 'react-native-view-pdf'
import React, { FC } from 'react'
import { Route, View } from 'react-native'
import { useTheme } from '@/Hooks'

interface ProjectScopeProps {
  route: Route
}

/**
 * Displays the project scope pdf if a valid pdf url is passed in
 * @param {route} route object containing pdf url
 * @returns {PDFView} view of the pdf file
 */
const ProjectScope: FC<ProjectScopeProps> = ({ route }) => {
  const { Layout } = useTheme()
  const pdf = route.params.pdf
  return (
    <View style={Layout.flex1}>
      <PDFView
        fadeInDuration={250.0}
        style={Layout.flex1}
        resource={pdf}
        onLoad={() => console.log(`PDF rendered from ${pdf}`)}
        onError={error => console.log('Cannot render PDF', error)}
      />
    </View>
  )
}

export default ProjectScope
