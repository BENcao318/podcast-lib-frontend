import React, { useEffect, useState } from 'react'

import LoadingGridTopPodcast from '../components/LoadingGridTopPodcast'
import LoadingGridOtherPodcasts from '../components/LoadingGridOtherPodcasts'

import serverAPI from '../hooks/useAxios'
import Podcasts from '../components/Podcasts'
import PodcastDetails from '../components/PodcastDetails'
import EpisodeWithPodcastInfo from '../components/EpisodeWithPodcastInfo'

// local state
// state within context
// global state with redux etc
// server state/cache ... swr, react-query etc

const SearchSection = ({ handlePlay, handlePause, searchResult }) => {
  const [podcastDetails, setPodcastDetails] = useState({})
  const [loadingContent, setLoadingContent] = useState(false)

  const topEpisodeSearchResults = searchResult.episodes.slice(0, 4)
  const otherPodcastResult = searchResult.podcasts.slice(1)

  const getPodcastDetails = (collectionId) => {
    setLoadingContent(true)
    return serverAPI.get(`/podcasts/${collectionId}`)
  }

  useEffect(() => {
    if (searchResult.podcasts.length !== 0) {
      getPodcastDetails(searchResult.podcasts[0].collectionId)
        .then((response) => {
          setLoadingContent(false)
          setPodcastDetails(response.data.results[0])
        })
    }
  }, [searchResult.podcasts])

  return (
    <div className='place-self-center grid gap-12 w-8/12 mt-8'>
      <div className='place-self-center flex gap-12'>
        <div>
          <p className='font-semibold text-3xl text-left ml-4 mb-4'>Top Podcast Result: </p>
          <div>
            {
              loadingContent ?
                <LoadingGridTopPodcast className='mx-6 justify-center' />
                :
                <section className='flex mx-6 justify-center gap-12'>
                  <PodcastDetails podcastDetails={podcastDetails} />
                </section >
            }
          </div>
        </div>
        <div>
          <p className='font-semibold text-3xl text-left mb-4'>Top Episode Result: </p>
          {searchResult.episodes.length !== 0 && (
            <div>
              {topEpisodeSearchResults.map(episode => (
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
              <LoadingGridOtherPodcasts className='mx-6 justify-center' />
              :
              <section className='flex mx-6 justify-center gap-12'>
                <Podcasts podcasts={otherPodcastResult} />
              </section >
          }
        </div>
      </div>
    </div>
  )
}

export default SearchSection