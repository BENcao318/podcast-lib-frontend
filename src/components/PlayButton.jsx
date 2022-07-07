import React from 'react'
import playButton from '../assets/icons8-play-button-circled-96.png';

const PlayButton = ({ handlePlay, episode }) => {
  return (
    <div className='border-2 rounded-xl px-2 py-1 w-24 flex gap-2 items-center hover:border-sky-600 cursor-pointer' onClick={() => handlePlay(episode)}>
      <img src={playButton} alt="playbutton" className="w-7 inline-block hover:animate-wiggle" />
      <span className='font-medium text-base text-sky-600'>PLAY</span>
    </div>
  )
}

export default PlayButton