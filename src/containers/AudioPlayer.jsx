import React, { useRef, useEffect, useState, useCallback } from 'react'
import axios from 'axios'

import { useDispatch, useSelector } from 'react-redux'
import { removeQueue } from '../redux/queue'

import { convertSecToHrMinSec, convertEpisodeDataNaming } from '../helpers/helpers'

import { ReactComponent as FastforwardButton } from '../assets/fastForwardButton30.svg'
import { ReactComponent as BackwardsButton } from '../assets/backwardsButton15.svg'
import { ReactComponent as PlayButton } from '../assets/play-button.svg'
import { ReactComponent as PauseButton } from '../assets/pause-button.svg'
import { ReactComponent as SoundImg } from '../assets/sound.svg'

function AudioPlayer({ handlePause, handlePlay, audioRef }) {
  const episodePlayer = useSelector((state) => state.episodePlayer)
  const queues = useSelector((state) => state.queue.queues)

  console.log(`123 ${process.env.REACT_APP_SERVER_URL}`);

  const [forwardEffect, setForwardEffect] = useState(false)   // For fastforward animation
  const [backwardEffect, setBackwardEffect] = useState(false) // For backward animation
  const [volume, setVolume] = useState(0.8)
  const [audioProgress, setAudioProgress] = useState('123')

  const dispatch = useDispatch()

  const intervalRef = useRef()

  const startInterval = useCallback(() => {
    clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      setAudioProgress(audioRef.current.currentTime)
    }, [1000])
  }, [audioRef])

  const fastforward = useCallback(() => {
    const fastforwardTime = 30
    if (audioRef.current.currentTime + fastforwardTime < audioRef.current.duration) {
      audioRef.current.currentTime += fastforwardTime
    }

    setAudioProgress(audioRef.current.currentTime)
    startInterval()
  }, [audioRef, startInterval])

  const backward = useCallback(() => {
    const backwardTime = 15
    audioRef.current.currentTime -= backwardTime
    setAudioProgress(audioRef.current.currentTime)
    startInterval()
  }, [audioRef, startInterval])

  const unQueue = useCallback(() => {
    const episode_to_unqueue = {
      track_id: episodePlayer.episode.trackId,
      episode_name: episodePlayer.episode.trackName
    }
    axios.post(`${process.env.REACT_APP_SERVER_URL}/unqueue`, { episode_to_unqueue }, { withCredentials: true })
      .then((response) => {
        dispatch(removeQueue(episodePlayer.episode.trackId))
      })
      .catch((error) => {
        console.log(error);
      })
  }, [dispatch, episodePlayer])

  useEffect(() => {
    if (episodePlayer.isPlaying) {
      startInterval()
    } else {
      clearInterval(intervalRef.current)
    }
  }, [episodePlayer, startInterval])

  useEffect(() => {
    audioRef.current.volume = volume
  }, [volume, audioRef])

  useEffect(() => {
    if (audioProgress >= audioRef.current.duration) {
      unQueue()
      handlePlay(convertEpisodeDataNaming(queues[0]))
    }
  }, [audioProgress, audioRef, handlePlay, unQueue, queues])

  return (
    <section className='fixed left-0 bottom-0 min-w-full z-20 h-28 bg-neutral-100 grid grid-cols-3 place-items-center shadow-inner shadow-sky-200'>
      <div className='flex justify-self-start'>
        <img src={episodePlayer.episode.artworkUrl160} alt="podcast cover" className='w-24 rounded-lg ml-4' />
        <div className='ml-4 my-auto max-h-24'>
          <p className='text-gray-600'>Playing Episode:</p>
          <p className='font-semibold text-lg'>{episodePlayer.episode.trackName}</p>
        </div>
      </div>
      <div className='justify-self-center'>
        <div className='flex gap-4' >
          <BackwardsButton
            className={`${backwardEffect && 'animate-wigglefast'} w-8 fill-green-600 rounded-full hover:fill-lime-600`}
            onClick={() => {
              backward()
              setBackwardEffect(true)
              setTimeout(() => {
                setBackwardEffect(false)
              }, 200)
            }}
          />
          <div className='w-16 flex place-content-center'>
            {episodePlayer.isPlaying ?
              <PauseButton
                className='w-12 fill-green-600 rounded-full hover:fill-lime-600'
                onClick={handlePause}
              />
              :
              <PlayButton className='w-12 fill-green-600 rounded-full hover:fill-lime-600' onClick={() => handlePlay(episodePlayer.episode)} />
            }
          </div>
          <FastforwardButton
            className={`${forwardEffect && 'animate-wigglefast'} w-8 fill-green-600 rounded-full hover:fill-lime-600`}
            onClick={() => {
              fastforward()
              setForwardEffect(true)
              setTimeout(() => {
                setForwardEffect(false)
              }, 200)
            }}
          />
        </div>
        {audioRef.current &&
          <div className='text-center mt-2'>
            {convertSecToHrMinSec(audioProgress)} / {convertSecToHrMinSec(audioRef.current.duration)}
          </div>
        }
      </div>
      <div className='text-center justify-self-end mr-12 flex items-center gap-2'>
        <SoundImg className='w-6' />
        <input
          type="range"
          min={0}
          max={1}
          step={0.02}
          value={volume}
          className="w-28 h-1 accent-green-800 cursor-pointer"
          onChange={event => {
            setVolume(event.target.valueAsNumber)
          }}
        />
        <p className='w-2'>{Math.floor(volume * 100).toString()}%</p>
      </div>
    </section >
  )
}

export default AudioPlayer