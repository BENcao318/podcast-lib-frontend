import React from 'react'
import { useNavigate } from 'react-router-dom'

const AskToSignInModal = ({ setShowModal }) => {
  const navigate = useNavigate()

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-auto max-w-3xl mx-auto my-6">
          <div className="relative flex flex-col w-full bg-white rounded-lg shadow-lg outline-none">
            <div className="max-w-3xl mx-auto my-6">
              <div className="relative flex flex-col items-center px-6 pt-2">
                <h3 className="text-2xl font-semibold ">
                  Sign in to enjoy more features of
                </h3>
                <h3 className="text-2xl font-semibold text-center">
                  Podcast Library
                </h3>
              </div>
              <div className="relative flex-auto px-12">
                <ul className="mt-8 list-disc text-md text-neutral-600">
                  <li>You can subscribe favourite podcasts</li>
                  <li>Add episodes to your personal playlist</li>
                  <li>Receive notification customized for you subscription</li>
                </ul>
              </div>
              <div className="flex items-center justify-end mt-6 border-t border-solid border-neutral-400 ">
                <span
                  className="text-xl cursor-pointer text-sky-600 hover:underline"
                  onClick={() => {
                    setShowModal(false)
                  }}
                >
                  No, thanks
                </span>
                <button
                  className="px-6 py-2 mx-6 my-2 text-lg font-semibold text-white rounded-lg bg-sky-600 hover:bg-sky-800 hover:shadow-lg"
                  type="button"
                  onClick={() => {
                    navigate('/login')
                    setShowModal(false)
                  }}
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-40"></div>
    </>
  )
}

export default AskToSignInModal
