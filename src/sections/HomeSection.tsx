import useSWR from 'swr'

import serverAPI from '../hooks/useAxios'
import Podcasts from '../components/Podcasts'

import loadingB from '../assets/loadingB.svg'
import { useEffect } from 'react'
import { useState } from 'react'

interface Props {}

const fetcher = (url: string) => {
  return serverAPI(url).then((response) => response.data.results)
}

const HomeSection: React.FC<Props> = () => {
  const [loading, setLoading] = useState(false)
  const { data } = useSWR('/podcasts', fetcher)

  useEffect(() => {
    data ? setLoading(false) : setLoading(true)
  }, [data])

  return (
    <section className="w-full gap-12 max-w-7xl justify-self-center">
      <h1 className="mt-6 mb-12 text-3xl font-bold">Top Podcasts</h1>
      {loading ? (
        <div className="text-lg font-bold mt-28">
          <img
            src={loadingB}
            alt="loading animation"
            className="mx-auto mt-64"
          />
          Please allow 15 ~ 20 secconds for Heroku server to start up. If no
          contents showing after 20 seconds, refresh the page to load them up.
        </div>
      ) : (
        <Podcasts podcasts={data} />
      )}
      <div className="h-36"></div>
    </section>
  )
}

export default HomeSection
