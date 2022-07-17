import React from 'react'
import audioPlayingButton from '../assets/icons8-audio-wave.gif'

interface Props {
  handlePause: () => void
}

const PauseButton: React.FC<Props> = ({ handlePause }) => {
  return (
    <div
      className="flex items-center gap-2 px-2 py-1 border-2 cursor-pointer rounded-xl hover:border-sky-600"
      onClick={() => handlePause()}
    >
      <img
        src={audioPlayingButton}
        alt="pausebutton"
        className="inline-block w-7"
        onClick={() => handlePause()}
      />
      <span className="text-base font-medium text-sky-600">PLAYING</span>
    </div>
  )
}

export default PauseButton
