import React, { useRef } from 'react'
import serverAPI from '../hooks/useAxios'
import { toast } from 'react-toastify'

import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addQueue, removeQueue } from '../redux/queue'

import { convertDateFormat, convertMillisecToHrMin, convertQueueDataNaming } from '../helpers/helpers'

import PauseButton from './PauseButton'
import PlayButton from './PlayButton'
import { ReactComponent as ToAddQueue } from '../assets/to-add-queues.svg'
import { ReactComponent as Queued } from '../assets/queue-checked.svg'

const Episode = ({ episode, handlePlay, handlePause }) => {
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
      serverAPI.post(`/queue`, { episode_to_queue })
        .then((response) => {
          dispatch(addQueue(episode_to_queue))
          toast.success(`Episode: ${episode_to_queue.episode_name} added to your queue.`, {
            position: "top-right",
            autoClose: 3600,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
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
    serverAPI.post(`/unqueue`, { episode_to_unqueue })
      .then((response) => {
        dispatch(removeQueue(episode.trackId))
        toast.info(`Episode: ${episode_to_unqueue.episode_name} removed from your queue.`, {
          position: "top-right",
          autoClose: 3600,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }, [dispatch, episode])

  return (
    <div className='max-w-2xl mb-4 text-left'>
      <p className='text-xs font-medium text-zinc-600'>{convertDateFormat(episode.releaseDate)}</p>
      <p className='text-xl font-semibold text-black'>{episode.trackName}</p>
      <div className='mb-2 text-gray-600'>
        {isReadMore ?
          <span>{episode.description}</span> :
          <span>{`${episode.description.slice(0, 123)} ...`}</span>
        }
        <span className='font-medium cursor-pointer text-zinc-600' onClick={toggleReadMore}>
          {isReadMore ?
            <span className='ml-4 underline text-end hover:text-sky-600 hover:decoration-sky-600 hover:opacity-80'>Read Less</span> :
            <span className='ml-4 underline text-end hover:text-sky-600 hover:decoration-indigo-600 hover:opacity-80'>Read More</span>
          }
        </span>
      </div>
      <div className='grid items-center grid-cols-2'>
        <div className='grid items-center grid-cols-2 w-60'>
          {episodePlayer.isPlaying && episodePlayer.episode.episodeUrl === episode.episodeUrl ?
            <PauseButton handlePause={handlePause} />
            :
            <PlayButton handlePlay={handlePlay} episode={episode} />
          }
          <span className='ml-6 text-sm font-medium text-neutral-600'>{convertMillisecToHrMin(episode.trackTimeMillis)}</span>
        </div>
        {
          queues.some((queue) => queue.track_id === episode.trackId) ?
            <div className='p-1 mr-2 rounded-lg cursor-pointer group justify-self-end hover:animate-wiggle ' onClick={handleUnQueue}>
              <Queued className='inline-block w-8 h-8 fill-sky-600 group-hover:fill-violet-600 ' />
            </div>
            :
            <div className='p-1 mr-2 cursor-pointer hover:border-sky-600 justify-self-end hover:animate-bounce' onClick={handleQueue}>
              <ToAddQueue className='inline-block w-8 h-8 fill-neutral-800 hover:fill-sky-600' />
            </div>
        }
      </div>
      {warning &&
        <div className='px-2 py-2 text-lg text-center bg-sky-600 font-base rounded-xl text-neutral-200 place-self-end'>
          Please log in before adding queues
        </div>
      }
      <hr className='mt-3 border-gray-600 border-b-1'></hr>
    </div>
  )
}

export default Episode