import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import GenresSection from '../sections/GenresSection';
import HomeSection from '../sections/HomeSection';
import SignInSection from '../sections/SignInSection';
import PodcastSection from '../sections/PodcastSection';
import QueuesSection from '../sections/QueuesSection';
import SearchSection from '../sections/SearchSection';
import SignUpSection from '../sections/SignUpSection';
import SubscriptionSection from '../sections/SubscriptionSection';

const Main = ({ handlePause, handlePlay, searchResult }) => {
  const userStatus = useSelector((state) => state.user)

  return (
    <main className='w-full text-center mt-16 grid'>
      <Routes>
        <Route path='/' element={<HomeSection />}></Route>
        <Route path='/search' element={<SearchSection handlePlay={handlePlay} handlePause={handlePause} searchResult={searchResult} />}></Route>
        <Route path='/podcasts/:id' element={<PodcastSection handlePause={handlePause} handlePlay={handlePlay} />}></Route>
        {userStatus.logged_in ?
          <Route path='/subscriptions' element={<SubscriptionSection />}> </Route> :
          <Route path='/subscriptions' element={<SignInSection />}> </Route>
        }
        {userStatus.logged_in ?
          <Route path='/queues' element={<QueuesSection handlePlay={handlePlay} handlePause={handlePause} />}> </Route> :
          <Route path='/queues' element={<SignInSection />}> </Route>
        }
        <Route path='/login' element={<SignInSection />}> </Route>
        <Route path='/signup' element={<SignUpSection />}> </Route>
        <Route path='/genres/:name/:id' element={<GenresSection />}></Route>
      </Routes>
    </main>
  )
}

export default Main