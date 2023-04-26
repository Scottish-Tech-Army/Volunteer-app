/**
 * @file Search icon.
 */

import { Icon } from 'native-base'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

/**
 * Component showing a search icon (magnifying glass), styled for our app.
 *
 * @returns {React.ReactElement} Component
 */
const SearchIconHighlighted = () => (
  <Icon
    as={MaterialIcons}
    color="accentPurple.100"
    ml="2"
    name="search"
    size={6}
  />
)

export default SearchIconHighlighted
