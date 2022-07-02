import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

import PodcastDetails from '../components/PodcastDetails'
import loadingB from '../assets/loadingB.svg'
import Episodes from '../components/Episodes';

function PodcastSection({ handlePause, handlePlay }) {
  const [podcastDetails, setPodcastDetails] = useState({})
  const [episodes, setEpisodes] = useState([])
  const [loadingContent, setLoadingContent] = useState(false)
  const { id } = useParams();

  const getPodcastDetails = (collectionId) => {
    setLoadingContent(true)
    return axios.get(`${process.env.REACT_APP_SERVER_URL}/podcasts/${collectionId}`)
  }

  // Get podcast details and episodes from the url by calling the backend api
  useEffect(() => {
    getPodcastDetails(id)
      .then((response) => {
        setLoadingContent(false)
        setPodcastDetails(response.data.results[0])
        setEpisodes(response.data.results.slice(1))
      })
  }, [id])

  return (
    <div>
      {
        loadingContent ?
          <img src={loadingB} alt="loading animation" className='mx-auto mt-64' />
          :
          <section className='flex mx-6 justify-center gap-12 mt-8'>
            <PodcastDetails podcastDetails={podcastDetails} />
            <Episodes episodes={episodes} handlePause={handlePause} handlePlay={handlePlay} />
          </section >
      }
      <div className='h-36'></div>
    </div>
  )
}

export default PodcastSection