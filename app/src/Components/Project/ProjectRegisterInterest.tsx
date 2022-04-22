import React, { FC, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import styled from 'styled-components/native'
import ProjectHeading from './ProjectHeading'
import DateTime from '../Forms/DateTime'
import SubmitButton from '../Forms/SubmitButton'
import TextInputControl from '../Forms/TextInputControl'
import YesNoChoice from '../Forms/YesNoChoice'
import { Project } from '@/Services/modules/projects'
import { validateEmail } from '@/Utils/Validation'

interface ProjectRegisterInterestProps {
  project: Project
}

const ProjectRegisterInterestView = styled.View`
  margin: 21px 27px 0px 27px;
`

const ProjectSubTitle = styled.Text`
  font-weight: 400;
  font-size: 16px;
`

const ProjectRole = styled.Text`
  font-weight: 600;
  font-size: 16px;
  margin-top: 9px;
  margin-bottom: 9px;
`

const ProjectRegisterInterest: FC<ProjectRegisterInterestProps> = ({ project }) => {
  const [availableFromDate, setAvailableFromDate] = useState(new Date())
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [happyToMentor, setHappyToMentor] = useState(false)
  const [lookingForBuddy, setLookingForBuddy] = useState(false)
  const today = new Date()
  const oneYearInTheFuture = new Date(new Date().setFullYear(today.getFullYear() + 1))

  const validateField = (fieldName: String, value: String): Boolean => {
    let valid = true
    let errorType = ''
  
    switch (fieldName) {
      case 'email':
        if (!Boolean(value)) {
          valid = false
          errorType = 'missing'
        } else if (!validateEmail(value)) {
          valid = false
          errorType = 'invalid'
        }
        break
      default:
        if (!Boolean(value)) {
          valid = false
          errorType = 'missing'
        }
        break
    }

    if (valid) {
      setErrors(latestErrors => {
        const updatedErrors = {...latestErrors}
        delete updatedErrors[fieldName]

        return updatedErrors
      })
    } else {
      setErrors(latestErrors => ({
        ...latestErrors,
        [fieldName]: {
          type: errorType,
        }
      }))
    }

    return valid
  }
  
  const validateForm = (): Boolean => {
    const firstNameValid = validateField('firstName', firstName)
    const lastNameValid = validateField('lastName', lastName)
    const emailValid = validateField('email', email)
    
    return firstNameValid && lastNameValid && emailValid
  }

  const submitForm = () => {
    const formIsValid = validateForm()

    if (formIsValid) {
      // Submit data
      // Deal with result
    }
  }
  
  return (
      <ScrollView>
        <ProjectRegisterInterestView>
          <ProjectHeading hideSaveProjectIcon title={project.name} />
          <ProjectSubTitle>{project.client}</ProjectSubTitle>
          <ProjectRole>{project.role}</ProjectRole>

          <TextInputControl
            error={errors.firstName}
            errorType={errors.firstName?.type}
            label="First name"
            onBlur={() => validateField('firstName', firstName)}
            onChange={setFirstName}
            type="firstName"
            value={firstName}
          />
          <TextInputControl
            error={errors.lastName}
            errorType={errors.lastName?.type}
            label="Last name"
            onBlur={() => validateField('lastName', lastName)}
            onChange={setLastName}
            type="lastName"
            value={lastName}
          />
          <TextInputControl
            error={errors.email}
            errorType={errors.email?.type}
            label="Email"
            onBlur={() => validateField('email', email)}
            onChange={setEmail}
            type="email"
            value={email}
          />

          <YesNoChoice description="Happy to mentor" onChange={(value) => setHappyToMentor(value)} value={happyToMentor} />
          <YesNoChoice description="Looking for a buddy" onChange={(value) => setLookingForBuddy(value)} value={lookingForBuddy} />

          <DateTime description="Available from..." maximumDate={oneYearInTheFuture} minimumDate={today} mode="date" onChange={(value) => setAvailableFromDate(value)} value={availableFromDate} />

          <SubmitButton onPress={submitForm} text="Submit" />
        </ProjectRegisterInterestView>
      </ScrollView>
    )
  }

export default ProjectRegisterInterest
