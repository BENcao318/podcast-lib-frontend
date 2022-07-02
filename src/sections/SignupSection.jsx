import axios from 'axios'
import React, { useState, useCallback } from 'react'

import { userLogin } from '../redux/user'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function SignupSection() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState()
  const [accountInfo, setAccountInfo] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const handleInput = useCallback((e) => {
    const value = e.target.value

    setAccountInfo({
      ...accountInfo,
      [e.target.name]: value
    })
  }, [accountInfo])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()

    const user = {
      username: accountInfo.username,
      email: accountInfo.email,
      password: accountInfo.password,
      password_confirmation: accountInfo.passwordConfirmation
    }

    axios.post(`${process.env.REACT_APP_SERVER_URL}/users`, { user }, { withCredentials: true })
      .then((response) => {
        if (response.data.user) {
          dispatch(userLogin(response.data.user))
          navigate('/')
        } else {
          setError(response.data.errors)
          setTimeout(() => {
            setError('')
          }, 2000)
        }
      })
      .catch((error) => console.log(error))
  }, [accountInfo, dispatch, navigate])

  return (
    <section className="absolute w-full h-full">
      <div>SignupSection</div>
      <div
        className="absolute top-0 w-full h-full bg-gray-900"
      ></div>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-gray-600 text-sm font-bold">
                    Signup with credentials
                  </h6>
                </div>
                <hr className="mt-6 border-b-1 border-gray-400" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      autoComplete="new-email"
                      id="new-email"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Email"
                      onChange={handleInput}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-username"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      autoComplete="new-username"
                      id="new-username"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Username"
                      onChange={handleInput}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      autoComplete="new-password"
                      id="new-password"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Password"
                      onChange={handleInput}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password Confirmation
                    </label>
                    <input
                      type="password"
                      name="passwordConfirmation"
                      autoComplete="new-password"
                      id="new-password"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Password confirmation"
                      onChange={handleInput}
                    />
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                      type="button"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                  {error ?
                    <div className='mt-2 bg-amber-600 rounded-lg'>
                      <span>{error}</span>
                    </div>
                    :
                    ''
                  }
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

  )
}

export default SignupSection