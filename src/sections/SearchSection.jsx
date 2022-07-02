import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

import Podcasts from '../components/Podcasts'
import PodcastDetails from '../components/PodcastDetails'
import EpisodeWithPodcastInfo from '../components/EpisodeWithPodcastInfo'

function SearchSection({ handlePlay, handlePause }) {
  const searchPodcastResult = useSelector((state) => state.search.searchPodcastResult)
  const searchEpisodeResult = useSelector((state) => state.search.searchEpisodeResult)

  const [podcastDetails, setPodcastDetails] = useState({})
  const [loadingContent, setLoadingContent] = useState(false)

  const getPodcastDetails = (collectionId) => {
    setLoadingContent(true)
    return axios.get(`${process.env.REACT_APP_SERVER_URL}/podcasts/${collectionId}`)
  }

  useEffect(() => {
    if (searchPodcastResult.length !== 0) {
      getPodcastDetails(searchPodcastResult[0].collectionId)
        .then((response) => {
          setLoadingContent(false)
          setPodcastDetails(response.data.results[0])
        })
    }
  }, [searchPodcastResult])

  return (
    <div className='place-self-center grid gap-12 w-8/12 mt-8'>
      <div className='place-self-center flex gap-12'>
        <div>
          <p className='font-semibold text-3xl text-left ml-4 mb-4'>Top Podcast Result: </p>
          <div>
            {
              loadingContent ?
                <span></span>
                :
                <section className='flex mx-6 justify-center gap-12'>
                  <PodcastDetails podcastDetails={podcastDetails} />
                </section >
            }
          </div>
        </div>
        <div>
          <p className='font-semibold text-3xl text-left mb-4'>Top Episode Result: </p>
          {searchEpisodeResult.length !== 0 && (
            <div>
              {searchEpisodeResult.slice(0, 4).map(episode => (
                <div key={episode.trackId}>
                  <EpisodeWithPodcastInfo episode={episode} handlePause={handlePause} handlePlay={handlePlay} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <hr className='border-2' />
      <h1 className='font-semibold text-3xl text-left mb-4'>Other Related Results: </h1>
      <div className='place-self-center w-full'>
        <div>
          {
            loadingContent ?
              <span></span>
              :
              <section className='flex mx-6 justify-center gap-12'>
                <Podcasts podcasts={searchPodcastResult.slice(1)} />
              </section >
          }
        </div>
      </div>
    </div>
  )
}

export default SearchSection