import React, { useRef } from 'react'
import axios from 'axios';

import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addQueue, removeQueue } from '../redux/queue'

import { convertDateFormat, convertMillisecToHrMin, convertQueueDataNaming } from '../helpers/helpers'

import PauseButton from './PauseButton'
import PlayButton from './PlayButton'
import { ReactComponent as ToAddQueue } from '../assets/to-add-queues.svg'
import { ReactComponent as Queued } from '../assets/queue-checked.svg'

function Episode({ episode, handlePlay, handlePause }) {
  const [isReadMore, setIsReadMore] = useState(false)
  const [warning, setWarning] = useState(false)

  const timeoutRef = useRef()

  const episodePlayer = useSelector((state) => state.episodePlayer)
  const queues = useSelector((state) => state.queue.queues)
  const dispatch = useDispatch()
  const userStatus = useSelector((state) => state.user)

  const toggleReadMore = useCallback(() => {
    setIsReadMore(prevIsReadMore => !prevIsReadMore)
  }, [])

  const handleQueue = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (userStatus.logged_in) {
      const episode_to_queue = convertQueueDataNaming(episode)
      axios.post(`${process.env.REACT_APP_SERVER_URL}/queue`, { episode_to_queue }, { withCredentials: true })
        .then((response) => {
          dispatch(addQueue(episode_to_queue))
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      setWarning(true)
      timeoutRef.current = setTimeout(() => {
        setWarning(false)
      }, 2000)
    }
  }, [dispatch, episode, userStatus.logged_in])

  const handleUnQueue = useCallback(() => {
    const episode_to_unqueue = {
      track_id: episode.trackId,
      episode_name: episode.trackName
    }
    axios.post(`${process.env.REACT_APP_SERVER_URL}/unqueue`, { episode_to_unqueue }, { withCredentials: true })
      .then((response) => {
        dispatch(removeQueue(episode.trackId))
      })
      .catch((error) => {
        console.log(error);
      })
  }, [dispatch, episode])

  return (
    <div className='mb-4 max-w-2xl text-left'>
      <p className='font-medium text-zinc-600 text-xs'>{convertDateFormat(episode.releaseDate)}</p>
      <p className='text-black font-semibold text-xl'>{episode.trackName}</p>
      <div className='text-gray-600 mb-2'>
        {isReadMore ?
          <span>{episode.description}</span> :
          <span>{`${episode.description.slice(0, 123)} ...`}</span>
        }
        <span className='font-medium text-zinc-600 cursor-pointer' onClick={toggleReadMore}>
          {isReadMore ?
            <span className='ml-4 text-end hover:text-sky-600 underline hover:decoration-sky-600 hover:opacity-80'>Read Less</span> :
            <span className='ml-4 text-end hover:text-sky-600 underline hover:decoration-indigo-600 hover:opacity-80'>Read More</span>
          }
        </span>
      </div>
      <div className='grid grid-cols-2 items-center'>
        <div className='grid grid-cols-2 items-center w-60'>
          {episodePlayer.isPlaying && episodePlayer.episode.episodeUrl === episode.episodeUrl ?
            <PauseButton handlePause={handlePause} />
            :
            <PlayButton handlePlay={handlePlay} episode={episode} />
          }
          <span className='text-sm font-medium text-neutral-600 ml-6'>{convertMillisecToHrMin(episode.trackTimeMillis)}</span>
        </div>
        {
          queues.some((queue) => queue.track_id === episode.trackId) ?
            <div className='group p-1 mr-2 cursor-pointer rounded-lg justify-self-end hover:animate-wiggle ' onClick={handleUnQueue}>
              <Queued className='w-8 h-8 fill-sky-600 group-hover:fill-violet-600 inline-block ' />
            </div>
            :
            <div className='p-1 mr-2 hover:border-sky-600 cursor-pointer justify-self-end hover:animate-bounce' onClick={handleQueue}>
              <ToAddQueue className='w-8 h-8 fill-neutral-800 hover:fill-sky-600 inline-block' />
            </div>
        }
      </div>
      {warning &&
        <div className='bg-sky-600 font-base rounded-xl text-neutral-200 text-lg py-2 px-2 place-self-end text-center'>
          Please log in before adding queues
        </div>
      }
      <hr className='mt-3 border-b-1 border-gray-600'></hr>
    </div>
  )
}

export default Episode