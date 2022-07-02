import React from 'react'
import Podcast from './Podcast'

function Podcasts({ podcasts }) {
  return (
    <div className='flex flex-wrap justify-center'>
      {podcasts.map(podcast => (
        <div key={podcast.collectionId}>
          <Podcast podcast={podcast} />
        </div>
      ))}
    </div>
  )
}

export default Podcasts