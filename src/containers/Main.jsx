import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import GenresSection from '../sections/GenresSection';
import HomeSection from '../sections/HomeSection';
import LoginSection from '../sections/LoginSection';
import PodcastSection from '../sections/PodcastSection';
import QueuesSection from '../sections/QueuesSection';
import SearchSection from '../sections/SearchSection';
import SignupSection from '../sections/SignupSection';
import SubscriptionSection from '../sections/SubscriptionSection';

function Main({ handlePause, handlePlay }) {
  const userStatus = useSelector((state) => state.user)

  return (
    <main className='w-full text-center mt-16 grid'>
      <Routes>
        <Route path='/' element={<HomeSection />}></Route>
        <Route path='/search' element={<SearchSection handlePlay={handlePlay} handlePause={handlePause} />}></Route>
        <Route path='/podcasts/:id' element={<PodcastSection handlePause={handlePause} handlePlay={handlePlay} />}></Route>
        {userStatus.logged_in ?
          <Route path='/subscriptions' element={<SubscriptionSection />}> </Route> :
          <Route path='/subscriptions' element={<LoginSection />}> </Route>
        }
        {userStatus.logged_in ?
          <Route path='/queues' element={<QueuesSection handlePlay={handlePlay} handlePause={handlePause} />}> </Route> :
          <Route path='/queues' element={<LoginSection />}> </Route>
        }
        <Route path='/login' element={<LoginSection />}> </Route>
        <Route path='/signup' element={<SignupSection />}> </Route>
        <Route path='/genres/:name/:id' element={<GenresSection />}></Route>
      </Routes>
    </main>
  )
}

export default Main