import axios from 'axios'
import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getQueues } from '../redux/queue'
import Episode from './Episode'

function Episodes({ episodes, handlePause, handlePlay }) {
  const dispatch = useDispatch()

  const userStatus = useSelector((state) => state.user)

  useEffect(() => {
    if (userStatus.logged_in) {
      axios.get(`${process.env.REACT_APP_SERVER_URL}/queues`, { withCredentials: true })
        .then((response) => {
          if (response.data) dispatch(getQueues(response.data));
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, [dispatch, userStatus.logged_in])

  return (
    episodes &&
    <div>
      {episodes.map(episode => (
        <div key={episode.trackId}>
          <Episode episode={episode} handlePause={handlePause} handlePlay={handlePlay} />
        </div>
      ))}
    </div>
  )
}

export default Episodes