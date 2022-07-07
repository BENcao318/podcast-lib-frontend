import React from 'react'
import Podcast from './Podcast'

const Podcasts = ({ podcasts }) => {
  return (
    <div className='flex flex-wrap justify-center'>
      {podcasts && podcasts.map(podcast => (
        <div key={podcast.collectionId}>
          <Podcast podcast={podcast} />
        </div>
      ))}
    </div>
  )
}

export default Podcasts