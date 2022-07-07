import React from 'react'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

const initialValues = {
  email: '',
  password: ''
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email required'),
  password: Yup.string().required('Password required'),
})

const SignInForm = ({ handleSubmit, signInErrors }) => {
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
            <h1 className="mb-8 text-2xl font-semibold text-center text-gray-800">Sign In 🚀</h1>

            <div className="w-full p-3">
              <Field
                name='email'
              >
                {({ field, meta }) => {
                  return (
                    < div >
                      <input
                        {...field}
                        type='text'
                        autoComplete='email'
                        className="block border border-grey-light font-medium w-full p-2 rounded focus:outline-none focus:ring focus:ring-sky-600"
                        placeholder='Email'
                      />
                      {
                        meta.touched && meta.error ? (
                          <div className='text-sm font-semibold text-red-400 mt-2'>{meta.error}</div>
                        ) : null
                      }
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
                        autoComplete='current-password'
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

            {signInErrors && (
              <div className="text-sm text-red-400 font-semibold mt-2">{signInErrors}</div>
            )}

            <button
              type='submit'
              className='bg-sky-600 py-3 w-full rounded-lg text-center text-white font-semibold text-lg hover:bg-sky-800 focus:outline-none mt-6'
            >
              Sign in
            </button>


          </div>
          <div className="text-grey-dark mt-6">
            Don't have an account?
            <span
              className="ml-2 underline cursor-pointer hover:text-blue-600"
              onClick={() => navigate('/signup')}
            >
              Sign up
            </span>
          </div>
        </div>
      </Form >
    </Formik >
  )
}

export default SignInForm