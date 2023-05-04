/**
 * @file Links to our privacy policy and terms & conditions.
 */

import { HStack, Link, Text } from 'native-base'
import React, { FC } from 'react'

interface PrivacyAndTermsLinksProps {
  fontSize?: string
}

/**
 * Component showing privacy policy and terms & conditions links.
 *
 * @returns {React.ReactElement} Component
 */
const PrivacyAndTermsLinks: FC<PrivacyAndTermsLinksProps> = ({ fontSize }) => {
  fontSize = fontSize ?? 'xs'

  return (
    <HStack space="4" justifyContent={'center'}>
      <Text>
        <Link
          _text={{
            color: 'darkGrey.100',
            _dark: { color: 'textDarkMode.100' },
            fontSize,
          }}
          href="https://www.scottishtecharmy.org/app-privacy-policy"
        >
          Privacy policy
        </Link>
      </Text>
      <Text>
        <Link
          _text={{
            color: 'darkGrey.100',
            _dark: { color: 'textDarkMode.100' },
            fontSize,
          }}
          href="https://www.scottishtecharmy.org/app-terms-conditions"
        >
          Terms & conditions
        </Link>
      </Text>
    </HStack>
  )
}

export default PrivacyAndTermsLinks
