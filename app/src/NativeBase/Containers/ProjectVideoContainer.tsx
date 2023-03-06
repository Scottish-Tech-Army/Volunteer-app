/**
 * @file Project video container.
 * Shows a web page containing a video from an external website (and branding, text, other videos, etc), when we can't just embed the video itself.
 * Could be YouTube, Vimeo or any other website.
 */

import React, { useState } from 'react'
import { ScrollView } from 'native-base'
import WebView from 'react-native-webview'

export interface ProjectVideoRouteParams {
  url: string
}

/**
 * Container for showing a video web page
 * @param {object} props The container props
 * @param {object} props.route A route object containing params
 * @param {ProjectVideoRouteParams} props.route.params The parameters to send to this container when navigating, to set what it displays
 * @param {string} props.route.params.url The URL of the video web page to show
 * @returns {React.ReactElement} Component
 */
const ProjectVideoContainer = (props: {
  route: {
    params: ProjectVideoRouteParams
  }
}) => {
  const [containerHeight, setContainerHeight] = useState(0)

  return (
    <ScrollView
      onLayout={onLayoutEvent => {
        const { height } = onLayoutEvent.nativeEvent.layout
        setContainerHeight(height)
      }}
    >
      <WebView
        allowsFullscreenVideo
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        nestedScrollEnabled
        scrollEnabled
        source={{ uri: props.route.params.url }}
        style={{ minHeight: containerHeight }}
      />
    </ScrollView>
  )
}

export default ProjectVideoContainer
