import React from 'react'
import audioPlayingButton from '../assets/icons8-audio-wave.gif'

function PauseButton({ handlePause }) {
  return (
    <div className='border-2 rounded-xl px-2 py-1 flex gap-2 items-center hover:border-sky-600 cursor-pointer' onClick={() => handlePause()}>
      <img src={audioPlayingButton} alt="pausebutton" className='w-7 inline-block' onClick={handlePause} />
      <span className='font-medium text-base text-sky-600'>PLAYING</span>
    </div>
  )
}

export default PauseButton