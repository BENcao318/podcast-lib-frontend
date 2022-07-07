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
    <aside className='lg:w-60 fixed min-h-screen flex-col z-20 bg-white'>
      <div className='flex items-center cursor-pointer mt-4' onClick={() => navigate('/')}>
        <PodcastLogo className='w-16 h-16 fill-sky-600 ml-4' />
        <span className='font-semibold text-2xl text-neutral-600 ml-4'> Podcast Library</span>
      </div>
      <hr className='mt-4 mb-6 border-b-0 border-gray-400' />
      <ul className='w-full font-semibold text-lg text-neutral-600 grid grid-rows-4 place-items-center ml-4'>
        <li className='group min-w-full py-3 flex items-center cursor-pointer ml-6' onClick={() => navigate('/')}>
          <HomeLogo className='w-6 h-6 inline-block group-hover:fill-sky-600' />
          <span className='ml-4 group-hover:text-sky-600'>Home</span>
        </li>
        <li
          className='group min-w-full py-3 flex items-center cursor-pointer ml-7'
          onClick={() => {
            userStatus.logged_in ?
              navigate('/subscriptions')
              :
              setShowModal(true)
          }}
        >
          <ListLogo className='w-5 h-5 inline-block group-hover:fill-sky-600' />
          <span className='ml-4 group-hover:text-sky-600'>Subscriptions</span>
        </li>
        <li
          className='group min-w-full py-3 flex items-center cursor-pointer ml-6'
          onClick={() => {
            userStatus.logged_in ?
              navigate('/queues')
              :
              setShowModal(true)
          }}
        >
          <QueuesLogo className='w-6 h-6 inline-block group-hover:fill-sky-600' />
          <span className='ml-3 group-hover:text-sky-600'>Queues</span>
        </li>
        <li className='group min-w-full py-3 flex items-center cursor-pointer ml-6'>
          <GridLogo className='w-6 h-6 inline-block group-hover:fill-sky-600' />
          <GenresPopover className='group-hover:text-sky-600' />
        </li>
      </ul>
      <hr className='mt-6 mb-6 border-b-0 border-gray-400' />

      <div className='absolute bottom-36 w-full flex flex-col'>
        <hr className='mb-2 border-b-0 border-gray-400' />
        {userStatus.logged_in ?
          <div className='relative min-w-full py-3 h-16 flex items-center justify-start'>
            <div className='absolute inset-x-12 group py-3 h-16 flex items-center justify-self-center cursor-pointer' >
              <div className='relative'>
                <UserLogo className='w-8 h-8 inline-block group-hover:fill-sky-600' />
                <span className='h-3 w-3'>
                  <span className="absolute animate-ping -top-2 -right-2 h-3 w-3 bg-sky-400 rounded-full opacity-75"></span>
                  <span className="absolute -top-2 -right-2 h-3 w-3 bg-sky-500 rounded-full"></span>
                </span>
              </div>
              <span className='ml-4 font-semibold text-lg text-neutral-600 group-hover:text-sky-600'>Your profile</span>
            </div>
            <SignOutPopover logout={logout} />
          </div>
          :
          <div className='group min-w-full py-3 h-16 flex items-center justify-center cursor-pointer' onClick={() => navigate('/login')}>
            <SigninLogo className='w-6 h-6 inline-block group-hover:fill-sky-600' />
            <span className='ml-4 font-semibold text-lg text-neutral-600  group-hover:text-sky-600'>Sign in</span>
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