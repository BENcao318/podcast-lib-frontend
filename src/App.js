import React, { useEffect, useState, useCallback } from 'react'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin, userLogout } from './redux/user'
import { ReactComponent as SidebarsLogo } from './assets/list-sidebar.svg'
import { ReactComponent as FoldMenuLogo } from './assets/left-arrow.svg'

import './App.css'
import 'react-toastify/dist/ReactToastify.css'

import SideBar from './containers/SideBar'
import Main from './containers/Main'
import AudioPlayer from './containers/AudioPlayer'
import serverAPI from './hooks/useAxios'
import SearchBar from './containers/SearchBar'
import AskToSignInModal from './components/AskToSignInModal'
import usePlayerApplications from './hooks/usePlayerApplications'

// import axios from 'axios'
// axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL ? process.env.REACT_APP_SERVER_URL : 'http://localhost:3001'

const App = () => {
  const { audioRef, handlePlay, handlePause } = usePlayerApplications()
  const episodePlayer = useSelector((state) => state.episodePlayer)
  const [searchResult, setSearchResult] = useState({
    podcasts: [],
    episodes: [],
  })
  const [showSidebar, setShowSidebar] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch()

  const userLoginStatus = useCallback(() => {
    serverAPI
      .get(`/logged_in`)
      .then((response) => {
        if (response.data.logged_in) {
          dispatch(userLogin(response.data.user))
        } else {
          dispatch(userLogout())
        }
      })
      .catch((error) => console.log('error:', error))
  }, [dispatch])

  useEffect(() => {
    userLoginStatus()
  }, [userLoginStatus])

  useEffect(() => {
    document.title = 'Podcast Library'
  }, [])

  return (
    <>
      <BrowserRouter>
        <div className="sticky flex justify-between w-64 px-4 py-2 top-2">
          <SidebarsLogo
            className={`w-8 h-8 fill-neutral-600 hover:fill-neutral-400 xxl:invisible cursor-pointer ${
              showSidebar ? 'invisible' : 'visible'
            }`}
            onClick={() => setShowSidebar(!showSidebar)}
          />
          <FoldMenuLogo
            className={`w-6 h-6 fill-neutrual-400 hover:fill-neutral-200 xxl:invisible cursor-pointer ${
              showSidebar ? 'visible' : 'invisible'
            }`}
            onClick={() => setShowSidebar(!showSidebar)}
          />
        </div>
        <SideBar showSidebar={showSidebar} setShowModal={setShowModal} />
        <div className="grid justify-items-center">
          <Main
            handlePause={handlePause}
            handlePlay={handlePlay}
            searchResult={searchResult}
          />
          {Object.keys(episodePlayer.episode).length !== 0 && (
            <AudioPlayer
              handlePause={handlePause}
              handlePlay={handlePlay}
              audioRef={audioRef}
            />
          )}
          <SearchBar
            searchResult={searchResult}
            setSearchResult={setSearchResult}
          />
        </div>
        {showModal ? <AskToSignInModal setShowModal={setShowModal} /> : null}
      </BrowserRouter>
      <ToastContainer
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
      />
    </>
  )
}

export default App
