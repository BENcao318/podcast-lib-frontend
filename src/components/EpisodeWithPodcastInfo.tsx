import React from 'react'

import { useNavigate } from 'react-router-dom'
import Episode from './Episode'
import { EpisodeInterface } from '../utils/interfaces'

interface Props {
  episode: EpisodeInterface
  handlePlay: () => void
  handlePause: () => void
}

const EpisodeWithPodcastInfo: React.FC<Props> = ({
  episode,
  handlePlay,
  handlePause,
}) => {
  const navigate = useNavigate()

  return (
    <div className="flex items-center">
      <div className="min-h-full cursor-pointer min-w-1/4">
        <img
          src={episode.artworkUrl160}
          alt="cover images"
          className="rounded-lg"
          onClick={() => navigate(`/podcasts/${episode.collectionId}`)}
        />
      </div>
      <Episode
        episode={episode}
        handlePause={handlePause}
        handlePlay={handlePlay}
      />
    </div>
  )
}

export default EpisodeWithPodcastInfo
