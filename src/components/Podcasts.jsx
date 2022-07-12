import React from 'react'
import Podcast from './Podcast'

const Podcasts = ({ podcasts }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {podcasts &&
        podcasts.map((podcast) => (
          <Podcast podcast={podcast} key={podcast.collectionId} />
        ))}
    </div>
  )
}

export default Podcasts
