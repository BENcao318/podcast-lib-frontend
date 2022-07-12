import serverAPI from '../hooks/useAxios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Queues from '../components/Queues'
import { getQueues } from '../redux/queue'

const QueuesSection = ({ handlePlay, handlePause }) => {
  const dispatch = useDispatch()
  const queues = useSelector((state) => state.queue.queues)

  useEffect(() => {
    serverAPI
      .get(`/queues`)
      .then((response) => {
        if (response.data) dispatch(getQueues(response.data))
      })
      .catch((error) => {
        console.log(error)
      })
  }, [dispatch])

  return (
    <section className="w-8/12 gap-12 justify-self-center">
      <div className="my-8 text-3xl font-bold">Your Queues:</div>
      <Queues
        queues={queues}
        handlePlay={handlePlay}
        handlePause={handlePause}
      />
      <div className="h-36"></div>
    </section>
  )
}

export default QueuesSection
