import React from 'react'
import Podcast from './Podcast'

import {PodcastInterface} from '../utils/interfaces'

interface Props {
  podcasts: PodcastInterface[]
}

const Podcasts: React.FC<Props> = ({ podcasts }) => {
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
