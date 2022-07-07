import serverAPI from '../hooks/useAxios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Queues from '../components/Queues'
import { getQueues } from '../redux/queue'

const QueuesSection = ({ handlePlay, handlePause }) => {
  const dispatch = useDispatch()
  const queues = useSelector((state) => state.queue.queues)

  useEffect(() => {
    serverAPI.get(`/queues`)
      .then((response) => {
        if (response.data) dispatch(getQueues(response.data));
      })
      .catch((error) => {
        console.log(error);
      })
  }, [dispatch])

  return (
    <section className='justify-self-center gap-12 w-8/12'>
      <div className='font-bold text-3xl my-8'>
        Your Queues:
      </div>
      <Queues queues={queues} handlePlay={handlePlay} handlePause={handlePause} />
      <div className='h-36'></div>
    </section>
  )
}

export default QueuesSection