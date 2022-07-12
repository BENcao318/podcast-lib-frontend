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
      getPodcastDetails(searchResult.podcasts[0].collectionId).then(
        (response) => {
          setLoadingContent(false)
          setPodcastDetails(response.data.results[0])
        }
      )
    }
  }, [searchResult.podcasts])

  return (
    <div className="grid w-8/12 gap-12 mt-8 place-self-center">
      <div className="flex gap-12 place-self-center">
        <div>
          <p className="mb-4 ml-4 text-3xl font-semibold text-left">
            Top Podcast Result:{' '}
          </p>
          <div>
            {loadingContent ? (
              <LoadingGridTopPodcast className="justify-center mx-6" />
            ) : (
              <section className="flex justify-center gap-12 mx-6">
                <PodcastDetails podcastDetails={podcastDetails} />
              </section>
            )}
          </div>
        </div>
        <div>
          <p className="mb-4 text-3xl font-semibold text-left">
            Top Episode Result:{' '}
          </p>
          {searchResult.episodes.length !== 0 && (
            <div>
              {topEpisodeSearchResults.map((episode) => (
                <div key={episode.trackId}>
                  <EpisodeWithPodcastInfo
                    episode={episode}
                    handlePause={handlePause}
                    handlePlay={handlePlay}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <hr className="border-2" />
      <h1 className="mb-4 text-3xl font-semibold text-left">
        Other Related Results:{' '}
      </h1>
      <div className="w-full place-self-center">
        <div>
          {loadingContent ? (
            <LoadingGridOtherPodcasts className="justify-center mx-6" />
          ) : (
            <section className="flex justify-center gap-12 mx-6">
              <Podcasts podcasts={otherPodcastResult} />
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchSection
