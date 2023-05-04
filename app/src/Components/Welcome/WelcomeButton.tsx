/**
 * @file 'Get Started' button allows user to go to main part of app from any slide
 */
import React, { useState } from 'react'
import styled from 'styled-components/native'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import { useTheme } from '@/Hooks'
import { useDispatch } from 'react-redux'
import Modal from '@/NativeBase/Components/Modal'
import PrivacyAndTermsLinks from '@/NativeBase/Components/PrivacyAndTermsLinks'
import { setPermissions } from '@/Store/Permissions'
import { changeWelcome, WelcomeState } from '@/Store/Welcome'
import { Text } from 'native-base'

/** The welcome 'Get started' button is displayed in the welcome splash screen, regardless of which pagination slide it is on. */
const WelcomeButton = () => {
  const { Colors, Fonts } = useTheme()
  const dispatch = useDispatch()
  const onChangeSplash = ({ welcome, show }: Partial<WelcomeState>) => {
    dispatch(changeWelcome({ welcome, show }))
  }
  const [showModal, setShowModal] = useState(false)

  const WelcomeButtonContainer = styled.TouchableOpacity`
        width:244px;
        height:42px;
        borderRadius:8px;
        display:flex;
        alignItems:center;
        justifyContent:center;
        elevation: 4;
        marginTop:20px;
    `

  const GetStartedText = styled.Text`
        color:#ffffff;
        lineHeight:24px;
        fontSize:18px;
        fontWeight:400;
    `

  const handleClose = (errorLogs: boolean) => {
    onChangeSplash({ show: false })
    dispatch(setPermissions({ data: { errorLogs } }))
    navigateAndSimpleReset('Main')
  }

  const handlePress = () => {
    setShowModal(true)
  }

  return (
    <WelcomeButtonContainer
      style={{ backgroundColor: Colors.welcomeButton }}
      onPress={handlePress}
    >
      <Modal
        body={[
          <Text>Can we automatically send bug reports to the STA team?</Text>,
          <Text>
            These might include some personally identifiable data. You can
            switch them off at any time in settings.
          </Text>,
          <Text>For more info please see:</Text>,
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

      <GetStartedText style={[Fonts.poppins]}>Get Started</GetStartedText>
    </WelcomeButtonContainer>
  )
}

export default WelcomeButton
