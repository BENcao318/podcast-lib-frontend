import React, { useRef, useEffect, useState, useCallback } from 'react'
import serverAPI from '../hooks/useAxios'

import { useDispatch, useSelector } from 'react-redux'
import { removeQueue } from '../redux/queue'

import {
  convertSecToHrMinSec,
  convertEpisodeDataNaming,
} from '../helpers/helpers'

import { ReactComponent as FastforwardButton } from '../assets/fastForwardButton30.svg'
import { ReactComponent as BackwardsButton } from '../assets/backwardsButton15.svg'
import { ReactComponent as PlayButton } from '../assets/play-button.svg'
import { ReactComponent as PauseButton } from '../assets/pause-button.svg'
import { ReactComponent as SoundImg } from '../assets/sound.svg'

const AudioPlayer = ({ handlePause, handlePlay, audioRef }) => {
  const episodePlayer = useSelector((state) => state.episodePlayer)
  const queues = useSelector((state) => state.queue.queues)

  const [forwardEffect, setForwardEffect] = useState(false) // For fastforward animation
  const [backwardEffect, setBackwardEffect] = useState(false) // For backward animation
  const [volume, setVolume] = useState(0.8)
  const [audioProgress, setAudioProgress] = useState(0)

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
    if (
      audioRef.current.currentTime + fastforwardTime <
      audioRef.current.duration
    ) {
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
      episode_name: episodePlayer.episode.trackName,
    }
    serverAPI
      .post(`/unqueue`, { episode_to_unqueue })
      .then((response) => {
        dispatch(removeQueue(episodePlayer.episode.trackId))
      })
      .catch((error) => {
        console.log(error)
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

  useEffect(() => {
    console.log('cleaning')
    return () => {
      clearInterval(intervalRef.current)
    }
  }, [intervalRef])

  return (
    <section className="fixed bottom-0 left-0 z-20 grid min-w-full grid-cols-3 shadow-inner h-28 bg-neutral-100 place-items-center shadow-sky-200">
      <div className="flex justify-self-start">
        <img
          src={episodePlayer.episode.artworkUrl160}
          alt="podcast cover"
          className="w-24 ml-4 rounded-lg"
        />
        <div className="my-auto ml-4 max-h-24">
          <p className="text-gray-600">Playing Episode:</p>
          <p className="text-lg font-semibold">
            {episodePlayer.episode.trackName}
          </p>
        </div>
      </div>
      <div className="justify-self-center">
        <div className="flex gap-4">
          <BackwardsButton
            className={`${
              backwardEffect && 'animate-wigglefast'
            } w-8 fill-green-600 rounded-full hover:fill-lime-600`}
            onClick={() => {
              backward()
              setBackwardEffect(true)
              setTimeout(() => {
                setBackwardEffect(false)
              }, 200)
            }}
          />
          <div className="flex w-16 place-content-center">
            {episodePlayer.isPlaying ? (
              <PauseButton
                className="w-12 rounded-full fill-green-600 hover:fill-lime-600"
                onClick={handlePause}
              />
            ) : (
              <PlayButton
                className="w-12 rounded-full fill-green-600 hover:fill-lime-600"
                onClick={() => handlePlay(episodePlayer.episode)}
              />
            )}
          </div>
          <FastforwardButton
            className={`${
              forwardEffect && 'animate-wigglefast'
            } w-8 fill-green-600 rounded-full hover:fill-lime-600`}
            onClick={() => {
              fastforward()
              setForwardEffect(true)
              setTimeout(() => {
                setForwardEffect(false)
              }, 200)
            }}
          />
        </div>
        {audioRef.current && (
          <div className="mt-2 text-center">
            {convertSecToHrMinSec(audioProgress)} /{' '}
            {convertSecToHrMinSec(audioRef.current.duration)}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 mr-12 text-center justify-self-end">
        <SoundImg className="w-6" />
        <input
          type="range"
          min={0}
          max={1}
          step={0.02}
          value={volume}
          className="h-1 cursor-pointer w-28 accent-green-800"
          onChange={(event) => {
            setVolume(event.target.valueAsNumber)
          }}
        />
        <p className="w-2">{Math.floor(volume * 100).toString()}%</p>
      </div>
    </section>
  )
}

export default AudioPlayer
