/**
 * @file Web view container.
 * Shows a web page containing a page from an external website filling the available height.
 */

import { ScrollView } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Platform } from 'react-native'
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
  // Hide WebView component initially on Android and only show it just after the component has rendered, otherwise Android screen animations can cause it to crash the app
  const [showWebView, setShowWebView] = useState(
    Platform.OS === 'android' ? false : true,
  )

  useEffect(() => {
    setTimeout(() => setShowWebView(true), 1000)
  }, [])
  const webViewStyle = {
    minHeight: containerHeight,
    opacity: 0.99, // recommended setting to reduce crashes on Android https://github.com/react-native-webview/react-native-webview/issues/1915
  }

  return (
    <ScrollView
      onLayout={onLayoutEvent => {
        const { height } = onLayoutEvent.nativeEvent.layout
        setContainerHeight(height)
      }}
    >
      {showWebView && (
        <WebView
          allowsFullscreenVideo
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          nestedScrollEnabled
          overScrollMode="never" // recommended setting to reduce crashes on Android https://github.com/react-native-webview/react-native-webview/issues/2364
          removeClippedSubviews // recommended setting to reduce crashes on Android https://github.com/react-native-webview/react-native-webview/issues/2364
          scrollEnabled
          source={{ uri: props.route.params.url }}
          style={webViewStyle}
        />
      )}
    </ScrollView>
  )
}

export default WebViewContainer
