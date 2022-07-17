import React from 'react'
import playButton from '../assets/icons8-play-button-circled-96.png'

import {EpisodeInterface} from '../utils/interfaces'

interface Props {
  handlePlay: (episode: EpisodeInterface) => void
  episode: EpisodeInterface
}

const PlayButton: React.FC<Props> = ({ handlePlay, episode }) => {
  return (
    <div
      className="flex items-center w-24 gap-2 px-2 py-1 border-2 cursor-pointer rounded-xl hover:border-sky-600"
      onClick={() => handlePlay(episode)}
    >
      <img
        src={playButton}
        alt="playbutton"
        className="inline-block w-7 hover:animate-wiggle"
      />
      <span className="text-base font-medium text-sky-600">PLAY</span>
    </div>
  )
}

export default PlayButton
