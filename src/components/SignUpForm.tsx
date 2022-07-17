import React from 'react'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

interface Props {
  handleSubmit: (data: {
    username: string
    email: string
    password: string
    passwordConfirmation: string
  }) => void
}

const initialValues = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
}

const validationSchema = Yup.object({
  username: Yup.string().required('Username required'),
  email: Yup.string().email('Invalid email format').required('Email required'),
  password: Yup.string().required('Password required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Password must be matching')
    .required('Confirm password required'),
})

const SignUpForm: React.FC<Props> = ({ handleSubmit }) => {
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
        <div className="container flex flex-col items-center justify-center flex-1 max-w-sm px-2 mx-auto">
          <div className="w-full px-6 py-8 text-black rounded-lg shadow-lg bg-emerald-400">
            <h1 className="mb-8 text-2xl font-semibold text-center text-gray-800">
              Registration 🧑‍🚀
            </h1>

            <div className="w-full p-3">
              <Field name="username">
                {({ field, meta }: any) => {
                  return (
                    <div>
                      <input
                        {...field}
                        type="text"
                        autoComplete="new-username"
                        className="block w-full p-2 font-medium border rounded border-grey-light focus:outline-none focus:ring focus:ring-sky-600"
                        placeholder="Username"
                      />
                      {meta.touched && meta.error ? (
                        <div className="mt-2 text-sm font-semibold text-red-400">
                          {meta.error}
                        </div>
                      ) : null}
                    </div>
                  )
                }}
              </Field>
            </div>

            <div className="w-full p-3">
              <Field name="email">
                {({ field, meta }: any) => {
                  return (
                    <div>
                      <input
                        {...field}
                        type="text"
                        autoComplete="new-email"
                        className="block w-full p-2 font-medium border rounded border-grey-light focus:outline-none focus:ring focus:ring-sky-600"
                        placeholder="Email"
                      />
                      {meta.touched && meta.error ? (
                        <div className="mt-2 text-sm font-semibold text-red-400">
                          {meta.error}
                        </div>
                      ) : null}
                    </div>
                  )
                }}
              </Field>
            </div>

            <div className="w-full p-3">
              <Field name="password">
                {({ field, meta }: any) => {
                  return (
                    <div>
                      <input
                        {...field}
                        type="password"
                        autoComplete="new-password"
                        className="block w-full p-2 font-medium border rounded border-grey-light focus:outline-none focus:ring focus:ring-sky-600"
                        placeholder="Password"
                      />
                      {meta.touched && meta.error ? (
                        <div className="mt-2 text-sm font-semibold text-red-400">
                          {meta.error}
                        </div>
                      ) : null}
                    </div>
                  )
                }}
              </Field>
            </div>

            <div className="w-full p-3">
              <Field name="passwordConfirmation">
                {({ field, meta }: any) => {
                  return (
                    <div>
                      <input
                        {...field}
                        type="password"
                        autoComplete="new-password"
                        className="block w-full p-2 font-medium border rounded border-grey-light focus:outline-none focus:ring focus:ring-sky-600"
                        placeholder="Confirm password"
                      />
                      {meta.touched && meta.error ? (
                        <div className="mt-2 text-sm font-semibold text-red-400">
                          {meta.error}
                        </div>
                      ) : null}
                    </div>
                  )
                }}
              </Field>
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-6 text-lg font-semibold text-center text-white rounded-lg bg-sky-600 hover:bg-sky-800 focus:outline-none"
            >
              Create Account
            </button>
          </div>
          <div className="mt-6 text-grey-dark">
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
