/**
 * @file Modal shows response from api.
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
        <Modal.Content>
          <Pressable onPress={() => onClose(true)}>
            <Modal.Header
              alignItems="center"
              borderBottomWidth="0"
              pb="0"
              _dark={{ color: 'textDarkMode.100' }}
              _light={{ color: 'darkerGrey.100' }}
            >
              <Icon
                as={MaterialIcons}
                mb="4"
                mt="4"
                color="darkerGrey.100"
                name="check-circle"
              />
              {header}
            </Modal.Header>
            <Modal.Body p="0">
              <Text textAlign="center" fontSize="sm" p="0">
                {message}
              </Text>
            </Modal.Body>
          </Pressable>
        </Modal.Content>
      </Modal>
    )
  } else {
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <Modal.Content>
          <Pressable onPress={() => onClose(true)}>
            <Modal.Header
              alignItems="center"
              borderBottomWidth="0"
              pb="0"
              _dark={{ color: 'textDarkMode.100' }}
              _light={{ color: 'text.100' }}
            >
              <Icon
                as={MaterialIcons}
                mb="4"
                mt="4"
                color="darkerGrey.100"
                name="error"
              />
              {header}
            </Modal.Header>
            <Modal.Body p="0">
              <Text textAlign="center" fontSize="sm" p="0">
                {message}
              </Text>
            </Modal.Body>
          </Pressable>
        </Modal.Content>
      </Modal>
    )
  }
}

export default ResponseModal
