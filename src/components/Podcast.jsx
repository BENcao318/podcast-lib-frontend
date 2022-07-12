import React from 'react'
import { useNavigate } from 'react-router-dom'

const Podcast = ({ podcast }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/podcasts/${podcast.collectionId}`)
  }

  return (
    <div
      className="w-1/4 mx-3 mb-4 overflow-hidden shadow-2xl cursor-pointer min-w-60 lg:w-1/6 rounded-xl bg-neutral-100 hover:border-2 border-sky-600"
      onClick={handleClick}
    >
      <img
        className="w-full"
        src={podcast.artworkUrl600}
        alt={`Podcast Cover ${podcast.artistName}`}
      />
      <div className="py-2 pl-6 text-left">
        <div className="mb-2 text-base font-bold">{podcast.collectionName}</div>
        <p className="text-xs text-gray-600">{podcast.artistName}</p>
      </div>
    </div>
  )
}

export default Podcast
