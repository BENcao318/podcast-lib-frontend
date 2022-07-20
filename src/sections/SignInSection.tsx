import serverAPI from '../hooks/useAxios'
import React from 'react'
import { toast } from 'react-toastify'
import { userLogin } from '../redux/user'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import SignInForm from '../components/SignInForm'
import { useState } from 'react'

// react-final-form. formik, 3rd one react hook form?

const SignInSection: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [signInErrors, setSignInErrors] = useState('')

  const handleSubmit = useCallback(
    (formInfo: any) => {
      const user = {
        email: formInfo.email,
        password: formInfo.password,
      }

      serverAPI.post(`/login`, { user }).then((response) => {
        if (response.data.logged_in) {
          dispatch(userLogin(response.data.user))
          setSignInErrors('')
          navigate('/')
          toast.success(`Welcome! ${response.data.user.username}`, {
            position: 'top-right',
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
        } else {
          setSignInErrors(response.data.errors)
        }
      })
    },
    [dispatch, navigate]
  )

  return (
    <section className="w-3/4 h-full mx-auto relatve xxl:1/2">
      <SignInForm handleSubmit={handleSubmit} signInErrors={signInErrors} />
    </section>
  )
}

export default SignInSection
