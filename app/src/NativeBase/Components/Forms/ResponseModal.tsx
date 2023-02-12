/**
 * @file Modal shows response when a form is submitted.
 */

import React, { FC } from 'react'
import { Text, Modal, Icon } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import StaTheme from '../../Theme/StaTheme'

interface ResponseModalProps {
  message: string
  header: string
  success: boolean
  isOpen: boolean
  onClose: (value: boolean) => void
}

const ResponseModal: FC<ResponseModalProps> = ({
  message,
  header,
  success,
  isOpen,
  onClose,
}) => {
  if (success === true) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        justifyContent="center"
        size="xl"
      >
        <Modal.Content
          _dark={{ backgroundColor: '#3c3c3b' }}
          _light={{ backgroundColor: StaTheme.colors.bg['100'] }}
        >
          <Modal.Header
            alignItems="center"
            _dark={{ backgroundColor: '#3c3c3b' }}
            _light={{ backgroundColor: StaTheme.colors.bg['100'] }}
          >
            <Icon
              as={MaterialIcons}
              _dark={{ color: '#fbfbfb' }}
              _light={{ color: '#737373' }}
              name="check-circle"
            />
            {header}
          </Modal.Header>
          <Modal.Body>
            <Text textAlign="center">{message}</Text>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    )
  } else {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content
          _dark={{ backgroundColor: '#3c3c3b' }}
          _light={{ backgroundColor: StaTheme.colors.bg['100'] }}
        >
          <Modal.Header
            alignItems="center"
            _dark={{ backgroundColor: '#3c3c3b' }}
            _light={{ backgroundColor: StaTheme.colors.bg['100'] }}
          >
            <Icon
              as={MaterialIcons}
              _dark={{ color: '#fbfbfb' }}
              _light={{ color: '#737373' }}
              color="#737373"
              name="error"
            />
            {header}
          </Modal.Header>
          <Modal.Body>
            <Text textAlign="center">{message}</Text>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    )
  }
}

export default ResponseModal
