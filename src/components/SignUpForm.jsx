import React from 'react'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

const initialValues = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: ''
}

const validationSchema = Yup.object({
  username: Yup.string().required('Username required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email required'),
  password: Yup.string().required('Password required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Password must be matching')
    .required('Confirm password required')
})

const SignUpForm = ({ handleSubmit }) => {
  const navigate = useNavigate()

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values)
        setSubmitting(false)
      }}
    >
      <Form className="relative flex min-h-screen -inset-y-16">
        <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
          <div className='bg-emerald-400 px-6 py-8 rounded-lg shadow-lg text-black w-full'>
            <h1 className="mb-8 text-2xl font-semibold text-center text-gray-800">Registration 🧑‍🚀</h1>

            <div className="w-full p-3">
              <Field
                name='username'
              >
                {({ field, meta }) => {
                  return (
                    <div>
                      <input
                        {...field}
                        type='text'
                        autoComplete='new-username'
                        className="block border border-grey-light font-medium w-full p-2 rounded focus:outline-none focus:ring focus:ring-sky-600"
                        placeholder='Username'
                      />
                      {meta.touched && meta.error ? (
                        <div className='text-sm font-semibold text-red-400 mt-2'>{meta.error}</div>
                      ) : null}
                    </div>
                  )
                }}
              </Field>
            </div>

            <div className="w-full p-3">
              <Field
                name='email'
              >
                {({ field, meta }) => {
                  return (
                    <div>
                      <input
                        {...field}
                        type='text'
                        autoComplete='new-email'
                        className="block border border-grey-light font-medium w-full p-2 rounded focus:outline-none focus:ring focus:ring-sky-600"
                        placeholder='Email'
                      />
                      {meta.touched && meta.error ? (
                        <div className='text-sm font-semibold text-red-400 mt-2'>{meta.error}</div>
                      ) : null}
                    </div>
                  )
                }}
              </Field>
            </div>

            <div className="w-full p-3">
              <Field
                name='password'
              >
                {({ field, meta }) => {
                  return (
                    <div>
                      <input
                        {...field}
                        type='password'
                        autoComplete='new-password'
                        className="block border border-grey-light font-medium w-full p-2 rounded focus:outline-none focus:ring focus:ring-sky-600"
                        placeholder='Password'
                      />
                      {meta.touched && meta.error ? (
                        <div className='text-sm font-semibold text-red-400 mt-2'>{meta.error}</div>
                      ) : null}
                    </div>
                  )
                }}
              </Field>
            </div>

            <div className="w-full p-3">
              <Field
                name='passwordConfirmation'
              >
                {({ field, meta }) => {
                  return (
                    <div>
                      <input
                        {...field}
                        type='password'
                        autoComplete='new-password'
                        className="block border border-grey-light font-medium w-full p-2 rounded focus:outline-none focus:ring focus:ring-sky-600"
                        placeholder='Confirm password'
                      />
                      {meta.touched && meta.error ? (
                        <div className='text-sm font-semibold text-red-400 mt-2'>{meta.error}</div>
                      ) : null}
                    </div>
                  )
                }}
              </Field>
            </div>

            <button
              type='submit'
              className='bg-sky-600 py-3 w-full rounded-lg text-center text-white font-semibold text-lg hover:bg-sky-800 focus:outline-none mt-6'
            >
              Create Account</button>

          </div>
          <div className="text-grey-dark mt-6">
            Already have an account?
            <span
              className="ml-2 underline cursor-pointer hover:text-blue-600"
              onClick={() => navigate('/login')}
            >
              Sign in
            </span>
          </div>
        </div>
      </Form>
    </Formik>
  )
}

export default SignUpForm
