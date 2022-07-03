import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, userLogout } from './redux/user'
import './App.css';

import SideBar from './containers/SideBar';
import Main from './containers/Main';
import AudioPlayer from './containers/AudioPlayer';
import axios from 'axios';
import SearchBar from './containers/SearchBar';
import { useCallback } from 'react';
import usePlayerApplications from './hooks/usePlayerApplications';

function App() {
  const { audioRef, handlePlay, handlePause } = usePlayerApplications()
  const episodePlayer = useSelector((state) => state.episodePlayer)
  const dispatch = useDispatch()

  const userLoginStatus = useCallback(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/logged_in`, { withCredentials: true })
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
          <Main handlePause={handlePause} handlePlay={handlePlay} />
          {
            Object.keys(episodePlayer.episode).length !== 0
            &&
            <AudioPlayer handlePause={handlePause} handlePlay={handlePlay} audioRef={audioRef} />
          }
          <SearchBar />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
