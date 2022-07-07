import React from 'react'

import { useNavigate } from 'react-router-dom';
import Episode from './Episode';

const EpisodeWithPodcastInfo = ({ episode, handlePlay, handlePause }) => {

  const navigate = useNavigate()

  return (
    <div className='flex'>
      <div className='cursor-pointer' >
        <img src={episode.artworkUrl160} alt="cover images" className='w-36 rounded-lg mr-6' onClick={() => navigate(`/podcasts/${episode.collectionId}`)} />
      </div>
      <Episode episode={episode} handlePause={handlePause} handlePlay={handlePlay} />
    </div>
  )
}

export default EpisodeWithPodcastInfo