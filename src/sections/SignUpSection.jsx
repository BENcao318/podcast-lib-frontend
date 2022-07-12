import serverAPI from '../hooks/useAxios'
import React, { useCallback } from 'react'

import SignUpForm from '../components/SignUpForm'

import { userLogin } from '../redux/user'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SignUpSection = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = useCallback(
    (formInfo) => {
      const user = {
        username: formInfo.username,
        email: formInfo.email,
        password: formInfo.password,
        password_confirmation: formInfo.passwordConfirmation,
      }

      serverAPI
        .post(`/users`, { user })
        .then((response) => {
          if (response.data.user) {
            dispatch(userLogin(response.data.user))
            navigate('/')
          } else {
            console.log(response.data.errors)
          }
        })
        .catch((error) => console.log(error))
    },
    [dispatch, navigate]
  )

  return (
    <section className="absolute w-full h-full">
      <SignUpForm handleSubmit={handleSubmit} />
    </section>
  )
}

export default SignUpSection
