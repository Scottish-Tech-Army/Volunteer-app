/**
 * @file 'Get Started' button allows user to go to main part of app from any slide
 */
import React, { useState } from 'react'
import { Button, VStack } from 'native-base'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import { useDispatch } from 'react-redux'
import Modal from '@/NativeBase/Components/Modal'
import PrivacyAndTermsLinks from '@/NativeBase/Components/PrivacyAndTermsLinks'
import { setPermissions } from '@/Store/Permissions'
import { changeWelcome, WelcomeState } from '@/Store/Welcome'
import { Text } from 'native-base'

/** The welcome 'Get started' button is displayed in the welcome splash screen, regardless of which pagination slide it is on. */
const WelcomeButton = () => {
  const dispatch = useDispatch()
  const onChangeSplash = ({ welcome, show }: Partial<WelcomeState>) => {
    dispatch(changeWelcome({ welcome, show }))
  }
  const [showModal, setShowModal] = useState(false)

  const handleClose = (errorLogs: boolean) => {
    onChangeSplash({ show: false })
    dispatch(setPermissions({ data: { errorLogs } }))
    navigateAndSimpleReset('Main')
  }

  const handlePress = () => {
    setShowModal(true)
  }

  return (
    <VStack marginTop="6" paddingX="4" width="100%">
      <Modal
        body={[
          <Text fontSize="md">
            Can we automatically send bug reports to the STA team?
          </Text>,
          <Text fontSize="md">
            These might include some personally identifiable data. You can
            switch them off at any time in settings.
          </Text>,
          <PrivacyAndTermsLinks fontSize="md" />,
        ]}
        header="Send bug reports?"
        headerIcon="help"
        isOpen={showModal}
        buttons={[
          {
            onPress: () => handleClose(true),
            text: 'OK',
          },
          {
            onPress: () => handleClose(false),
            isSecondary: true,
            text: 'No thanks',
          },
        ]}
        requiresButtonPress
      />

      <Button onPress={handlePress}>Get Started</Button>
    </VStack>
  )
}

export default WelcomeButton
