import { useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { episodePlaying, episodePause, episodeLoading, setPlayingEpisode } from '../redux/episodePlayer'

function usePlayerApplications() {
  const audioRef = useRef()
  const dispatch = useDispatch()
  const episodePlayer = useSelector((state) => state.episodePlayer)

  const handlePlay = (episode) => {
    if (!episodePlayer.episode.episodeUrl) {
      dispatch(episodeLoading())
      audioRef.current = new Audio(episode.episodeUrl)
      audioRef.current.play()
      dispatch(setPlayingEpisode(episode))
      dispatch(episodePlaying())
    } else if (episodePlayer.episode.episodeUrl !== episode.episodeUrl) {
      audioRef.current.pause()    //pause current playing audio and create a new audio instance
      audioRef.current = new Audio(episode.episodeUrl)
      audioRef.current.play()
      dispatch(episodePlaying())
      dispatch(setPlayingEpisode(episode))
    } else {
      audioRef.current.play()
      dispatch(episodePlaying(episode))
      dispatch(setPlayingEpisode(episode))
    }
  }

  const handlePause = () => {
    audioRef.current.pause()
    dispatch(episodePause())
  }

  return {
    audioRef,
    handlePlay,
    handlePause
  }
}

export default usePlayerApplications