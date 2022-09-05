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

import { PodcastDetailsInterface } from '../utils/interfaces'

interface Props {
  handlePlay: () => void
  handlePause: () => void
  searchResult: any
}

const SearchSection: React.FC<Props> = ({
  handlePlay,
  handlePause,
  searchResult,
}) => {
  const [podcastDetails, setPodcastDetails] = useState<PodcastDetailsInterface>(
    {
      releaseDate: '',
      collectionName: '',
      description: '',
      artistName: '',
      artworkUrl600: '',
      genreIds: [],
      genres: [],
      trackId: 0,
      collectionViewUrl: '',
    }
  )
  const [loadingContent, setLoadingContent] = useState(false)

  const topEpisodeSearchResults = searchResult.episodes.slice(0, 4)
  const otherPodcastResult = searchResult.podcasts.slice(1)

  const getPodcastDetails = (collectionId: number) => {
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
    <div className="grid gap-12 mt-8 xxl:w-8/12 place-self-center">
      <div className="flex flex-col gap-12 lg:flex-row place-self-center">
        <div>
          <p className="mb-6 ml-4 text-3xl font-semibold text-center text-gray-600">
            Top Podcast Result:
          </p>
          <div>
            {loadingContent ? (
              <span className="justify-center mx-6">
                <LoadingGridTopPodcast />
              </span>
            ) : (
              <section className="flex justify-center gap-12 mx-6">
                <PodcastDetails podcastDetails={podcastDetails} />
              </section>
            )}
          </div>
        </div>
        <div>
          <p className="mb-6 text-3xl font-semibold text-center text-gray-600">
            Top Episode Result:{' '}
          </p>
          {searchResult.episodes.length !== 0 && (
            <div>
              {topEpisodeSearchResults.map((episode: any) => (
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
            <span className="justify-center mx-6">
              <LoadingGridOtherPodcasts />
            </span>
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
