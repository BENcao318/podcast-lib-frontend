import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import serverAPI from '../hooks/useAxios'
import useSWR from 'swr'

import PodcastDetails from '../components/PodcastDetails'
import loadingB from '../assets/loadingB.svg'
import Episodes from '../components/Episodes'

interface Props {
  handlePause: () => void
  handlePlay: () => void
}

const PodcastSection: React.FC<Props> = ({ handlePause, handlePlay }) => {
  const [loadingContent, setLoadingContent] = useState(false)
  const { id } = useParams()

  const fetcher = (url: string) => {
    return serverAPI(url).then((response) => response.data.results)
  }

  const { data } = useSWR(`/podcasts/${id}`, fetcher)

  useEffect(() => {
    if (data) {
      setLoadingContent(false)
    } else {
      setLoadingContent(true)
    }
  }, [data])

  return (
    <div>
      {loadingContent ? (
        <img src={loadingB} alt="loading animation" className="mx-auto mt-64" />
      ) : (
        <section className="flex justify-center gap-12 mx-6 mt-8">
          {data && <PodcastDetails podcastDetails={data[0]} />}
          {data && (
            <Episodes
              episodes={data.slice(1)}
              handlePause={handlePause}
              handlePlay={handlePlay}
            />
          )}
        </section>
      )}
      <div className="h-36"></div>
    </div>
  )
}

export default PodcastSection
