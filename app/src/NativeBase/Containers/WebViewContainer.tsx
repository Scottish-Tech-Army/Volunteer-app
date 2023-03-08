/**
 * @file Web view container.
 * Shows a web page containing a page from an external website filling the available height.
 */

import React, { useState } from 'react'
import { ScrollView } from 'native-base'
import WebView from 'react-native-webview'

export interface WebViewRouteParams {
  url: string
}

/**
 * Container for showing a web page
 * @param {object} props The container props
 * @param {object} props.route A route object containing params
 * @param {WebViewRouteParams} props.route.params The parameters to send to this container when navigating, to set what it displays
 * @param {string} props.route.params.url The URL of the web page to show
 * @returns {React.ReactElement} Component
 */
const WebViewContainer = (props: {
  route: {
    params: WebViewRouteParams
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

export default WebViewContainer
