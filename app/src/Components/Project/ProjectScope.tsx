/**
 * @file Project Scope
 */

/**
 * Displays the project scope pdf if a valid pdf url is passed in
 * @param {route} route object containing pdf url
 * @returns view of the pdf file
 */

import PDFView from 'react-native-view-pdf'
import React, { FC } from 'react'
import { Route, View } from 'react-native'


interface ProjectScopeProps {
  route: Route
}

const ProjectScope: FC<ProjectScopeProps> = ({ route }) => {
  const pdf = route.params.pdf
  return (
    <View style={{ flex: 1 }}>
      {
        <PDFView
          fadeInDuration={250.0}
          style={{ flex: 1 }}
          resource={pdf}
          onLoad={() => console.log(`PDF rendered from ${pdf}`)}
          onError={error => console.log('Cannot render PDF', error)}
        />
      }
    </View>
  )
}

export default ProjectScope
