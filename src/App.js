import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin, userLogout } from './redux/user'

import './App.css'
import 'react-toastify/dist/ReactToastify.css'

import SideBar from './containers/SideBar'
import Main from './containers/Main'
import AudioPlayer from './containers/AudioPlayer'
import serverAPI from './hooks/useAxios'
import SearchBar from './containers/SearchBar'
import { useCallback } from 'react'
import usePlayerApplications from './hooks/usePlayerApplications'

// import axios from 'axios'
// axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL ? process.env.REACT_APP_SERVER_URL : 'http://localhost:3001'

const App = () => {
  const { audioRef, handlePlay, handlePause } = usePlayerApplications()
  const episodePlayer = useSelector((state) => state.episodePlayer)
  const [searchResult, setSearchResult] = useState({
    podcasts: [],
    episodes: []
  })
  const dispatch = useDispatch()

  const userLoginStatus = useCallback(() => {
    serverAPI.get(`/logged_in`)
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
        <SideBar />
        <div className='grid justify-items-center'>
          <Main handlePause={handlePause} handlePlay={handlePlay} searchResult={searchResult} />
          {
            Object.keys(episodePlayer.episode).length !== 0
            &&
            <AudioPlayer handlePause={handlePause} handlePlay={handlePlay} audioRef={audioRef} />
          }
          <SearchBar searchResult={searchResult} setSearchResult={setSearchResult} />
        </div>

      </BrowserRouter>
      <ToastContainer
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
      />
    </>
  );
}

export default App;
