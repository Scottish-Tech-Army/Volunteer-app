/**
 * @file A form for the user to register interest in taking part in a volunteer project.
 */

import React, { FC, useEffect, useState } from 'react'
import { ScrollView, VStack, useColorModeValue } from 'native-base'
import dayjs from 'dayjs'
import ButtonComponent from '../Forms/Button'
import YesNoChoice from '../Forms/YesNoChoice'
import TextInputControl from '../Forms/TextInputControl'
import DateTime from '../Forms/DateTime'
import ResponseModal from '../Forms/ResponseModal'
import { goBack } from '@/Navigators/utils'
import {
  Project,
  useLazyProjectRegisterInterestQuery,
} from '@/Services/modules/projects'
import { validateEmail } from '@/Utils/Validation'

interface ProjectRegisterInterestProps {
  project: Project
}

/**
 * Form for user to register interest in a project
 *
 * @param {ProjectRegisterInterestProps} props The component props
 * @param {Project} props.project The project the user's registering interest in
 * @returns {React.ReactElement} Component
 */

const ProjectRegisterInterest: FC<ProjectRegisterInterestProps> = ({
  project,
}) => {
  const [availableFromDate, setAvailableFromDate] = useState(new Date())
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<{
    [key: string]: { type: 'invalid' | 'missing' }
  }>({})
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [lookingForBuddy, setLookingForBuddy] = useState(false)
  const today = new Date()
  const oneYearInTheFuture = new Date(
    new Date().setFullYear(today.getFullYear() + 1),
  )
  const [registerInterest, { data: responseData, error: responseError }] =
    useLazyProjectRegisterInterestQuery()
  const [loading, setLoading] = useState(false)

  //modal states
  const [success, setSuccess] = useState(false)

  const [responseHeader, setResponseHeader] = useState('')
  const [responseMessage, setResponseMessage] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    if (responseData || responseError) {
      setLoading(false)
      setModalVisible(true)

      if (responseData) {
        // Alert.alert(
        //   'Thanks! One of the STA team will be in touch with you soon on Slack',
        // )
        // goBack()
        setSuccess(true)
        setResponseHeader('Application Received')
        setResponseMessage(
          'Your request has been received. The STA team will respond shortly.',
        )
      }
      if (responseError) {
        // console.error(responseError)

        setResponseHeader('Something went wrong')
        setResponseMessage(
          "Sorry, we couldn't send your message - please try again. If this keeps happening, please contact the STA Volunteer App team.",
        )
      }
    }
  }, [responseData, responseError])

  const onClose = () => {
    setModalVisible(false)
    goBack()
  }
  const validateField = (fieldName: string, value: string): boolean => {
    let valid = true
    let errorType = 'missing' as 'invalid' | 'missing'

    switch (fieldName) {
      case 'email':
        if (!value) {
          valid = false
        } else if (!validateEmail(value)) {
          valid = false
          errorType = 'invalid'
        }
        break
      default:
        if (!value) {
          valid = false
        }
        break
    }

    if (valid) {
      setErrors(latestErrors => {
        const updatedErrors = { ...latestErrors }
        delete updatedErrors[fieldName]

        return updatedErrors
      })
    } else {
      setErrors(latestErrors => ({
        ...latestErrors,
        [fieldName]: {
          type: errorType,
        },
      }))
    }

    return valid
  }

  const validateForm = (): boolean => {
    const firstNameValid = validateField('firstName', firstName)
    const lastNameValid = validateField('lastName', lastName)
    const emailValid = validateField('email', email)

    return firstNameValid && lastNameValid && emailValid
  }

  const submitForm = (): void => {
    const formIsValid = validateForm()

    if (formIsValid) {
      setLoading(true)

      registerInterest({
        project: {
          it_key: project.it_key,
          res_id: project.res_id,
        },
        user: {
          firstName,
          lastName,
          email,
          lookingForBuddy,
          happyToMentor: false,
          availableFrom: dayjs(availableFromDate).format('YYYY-MM-DD'),
        },
      })
    }
  }

  const colorScheme = useColorModeValue('#3c3c3b', '#fbfbfb')

  return (
    <>
      <ResponseModal
        isOpen={modalVisible}
        header={responseHeader}
        message={responseMessage}
        success={success}
        onClose={onClose}
      />
      <ScrollView>
        <VStack margin="9px">
          <TextInputControl
            error={errors.hasOwnProperty('firstName')}
            errorType={errors.firstName?.type}
            label="First Name"
            onBlur={() => validateField('firstName', firstName)}
            onChange={setFirstName}
            type="firstName"
            value={firstName}
          />
          <TextInputControl
            error={errors.hasOwnProperty('lastName')}
            errorType={errors.lastName?.type}
            label="Last Name"
            onBlur={() => validateField('lastName', lastName)}
            onChange={setLastName}
            type="lastName"
            value={lastName}
          />
          <TextInputControl
            error={errors.hasOwnProperty('email')}
            errorType={errors.email?.type}
            label="Email"
            onBlur={() => validateField('email', email)}
            onChange={setEmail}
            type="email"
            value={email}
          />

          <YesNoChoice
            description="Looking for peer support"
            onChange={value => setLookingForBuddy(value)}
            value={lookingForBuddy}
          />

          <DateTime
            description="I'm available from"
            maximumDate={oneYearInTheFuture}
            minimumDate={today}
            mode="date"
            onChange={value => setAvailableFromDate(value)}
            value={availableFromDate}
            color={colorScheme}
          />

          <ButtonComponent
            disabled={loading}
            onPress={submitForm}
            primary
            text={loading ? 'Sending...' : 'Volunteer Now'}
          />
        </VStack>
      </ScrollView>
    </>
  )
}

export default ProjectRegisterInterest
