import serverAPI from '../hooks/useAxios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userLogout } from '../redux/user'

import { ReactComponent as HomeLogo } from '../assets/home.svg'
import { ReactComponent as ListLogo } from '../assets/list.svg'
import { ReactComponent as QueuesLogo } from '../assets/queues.svg'
import { ReactComponent as GridLogo } from '../assets/grid.svg'
import { ReactComponent as PodcastLogo } from '../assets/noun-podcast-26.svg'
import { ReactComponent as SigninLogo } from '../assets/signin.svg'
import { ReactComponent as UserLogo } from '../assets/user.svg'
import GenresPopover from '../components/GenresPopover'
import AskToSignInModal from '../components/AskToSignInModal'
import { useState } from 'react'
import SignOutPopover from '../components/SignOutPopover'

const SideBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  const userStatus = useSelector((state) => state.user)

  function logout() {
    serverAPI.delete(`/logout`)
      .then((response) => {
        if (response.data.logged_out) {
          dispatch(userLogout())
          navigate('/')
          console.log(response.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <aside className='fixed z-20 flex-col min-h-screen bg-white lg:w-60'>
      <div className='flex items-center mt-4 cursor-pointer' onClick={() => navigate('/')}>
        <PodcastLogo className='w-16 h-16 ml-4 fill-sky-600' />
        <span className='ml-4 text-2xl font-semibold text-neutral-600'> Podcast Library</span>
      </div>
      <hr className='mt-4 mb-6 border-b-0 border-gray-400' />
      <ul className='grid w-full grid-rows-4 ml-4 text-lg font-semibold text-neutral-600 place-items-center'>
        <li className='flex items-center min-w-full py-3 ml-6 cursor-pointer group' onClick={() => navigate('/')}>
          <HomeLogo className='inline-block w-6 h-6 group-hover:fill-sky-600' />
          <span className='ml-4 group-hover:text-sky-600'>Home</span>
        </li>
        <li
          className='flex items-center min-w-full py-3 cursor-pointer group ml-7'
          onClick={() => {
            userStatus.logged_in ?
              navigate('/subscriptions')
              :
              setShowModal(true)
          }}
        >
          <ListLogo className='inline-block w-5 h-5 group-hover:fill-sky-600' />
          <span className='ml-4 group-hover:text-sky-600'>Subscriptions</span>
        </li>
        <li
          className='flex items-center min-w-full py-3 ml-6 cursor-pointer group'
          onClick={() => {
            userStatus.logged_in ?
              navigate('/queues')
              :
              setShowModal(true)
          }}
        >
          <QueuesLogo className='inline-block w-6 h-6 group-hover:fill-sky-600' />
          <span className='ml-3 group-hover:text-sky-600'>Queues</span>
        </li>
        <li className='flex items-center min-w-full py-3 ml-6 cursor-pointer group'>
          <GridLogo className='inline-block w-6 h-6 group-hover:fill-sky-600' />
          <GenresPopover className='group-hover:text-sky-600' />
        </li>
      </ul>
      <hr className='mt-6 mb-6 border-b-0 border-gray-400' />

      <div className='absolute flex flex-col w-full bottom-36'>
        <hr className='mb-2 border-b-0 border-gray-400' />
        {userStatus.logged_in ?
          <div className='relative flex items-center justify-start h-16 min-w-full py-3'>
            <div className='absolute flex items-center h-16 py-3 cursor-pointer inset-x-12 group justify-self-center' >
              <div className='relative'>
                <UserLogo className='inline-block w-8 h-8 group-hover:fill-sky-600' />
                {/* <span className='w-3 h-3'>
                  <span className="absolute w-3 h-3 rounded-full opacity-75 animate-ping -top-2 -right-2 bg-sky-400"></span>
                  <span className="absolute w-3 h-3 rounded-full -top-2 -right-2 bg-sky-500"></span>
                </span> */}
              </div>
              <span className='ml-4 text-lg font-semibold text-neutral-600 group-hover:text-sky-600'>Your profile</span>
            </div>
            <SignOutPopover logout={logout} />
          </div>
          :
          <div className='flex items-center justify-center h-16 min-w-full py-3 cursor-pointer group' onClick={() => navigate('/login')}>
            <SigninLogo className='inline-block w-6 h-6 group-hover:fill-sky-600' />
            <span className='ml-4 text-lg font-semibold text-neutral-600 group-hover:text-sky-600'>Sign in</span>
          </div>
        }
        <hr className='mt-2 border-b-0 border-gray-400' />
      </div>
      {
        showModal ?
          <AskToSignInModal setShowModal={setShowModal} />
          :
          null
      }
    </aside>
  )
}


export default SideBar