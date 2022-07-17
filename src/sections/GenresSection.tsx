import serverAPI from '../hooks/useAxios'
import React from 'react'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Podcasts from '../components/Podcasts'

const GenresSection: React.FC = () => {
  const [podcasts, setPodcasts] = useState([])
  const { name, id } = useParams()

  useEffect(() => {
    serverAPI
      .get(`/genres/${id}`)
      .then((response) => {
        if (response.data.success) {
          const topPodcasts = JSON.parse(response.data.podcasts).results
          setPodcasts(topPodcasts)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id])

  return (
    <section className="w-8/12 gap-12 justify-self-center">
      <h1 className="mt-6 mb-12 text-3xl font-bold">
        Top
        <span className="text-sky-600"> {name} </span>
        podcasts
      </h1>
      <Podcasts podcasts={podcasts} />
      <div className="h-36"></div>
    </section>
  )
}

export default GenresSection
