/**
 * @file Modal shows response when a form is submitted.
 */

import React, { FC } from 'react'
import { Text, Modal, Icon } from 'native-base'
import { Pressable } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

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
  if (success) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        justifyContent="center"
        size="xl"
      >
        <Modal.Content
          _dark={{ color: 'bgDarkMode.100' }}
          _light={{ backgroundColor: 'bg.100' }}
        >
          <Pressable onPress={() => onClose(true)}>
            <Modal.Header
              alignItems="center"
              _dark={{ color: 'bgDarkMode.100' }}
              _light={{ color: 'grey.60' }}
            >
              <Icon
                as={MaterialIcons}
                _dark={{ color: 'textDarkMode.100' }}
                _light={{
                  color: 'grey.60',
                }}
                name="check-circle"
              />
              {header}
            </Modal.Header>
            <Modal.Body>
              <Text textAlign="center">{message}</Text>
            </Modal.Body>
          </Pressable>
        </Modal.Content>
      </Modal>
    )
  } else {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content
          _dark={{ color: 'bgDarkMode.100' }}
          _light={{ backgroundColor: 'bg.100' }}
        >
          <Modal.Header
            alignItems="center"
            _dark={{ color: 'bgDarkMode.100' }}
            _light={{ color: 'grey.60' }}
          >
            <Icon
              as={MaterialIcons}
              _dark={{ color: 'textDarkMode.100' }}
              _light={{
                color: 'grey.60',
              }}
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
