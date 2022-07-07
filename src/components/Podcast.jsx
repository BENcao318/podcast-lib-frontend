import React from 'react'
import { useNavigate } from 'react-router-dom';


const Podcast = ({ podcast }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/podcasts/${podcast.collectionId}`)
  }

  return (
    <div className='max-w-xs overflow-hidden rounded-xl shadow-2xl mx-3 mb-4 bg-neutral-100 cursor-pointer hover:border-2 border-sky-600' onClick={handleClick}>
      <img className='w-full' src={podcast.artworkUrl600} alt={`Podcast Cover ${podcast.artistName}`} />
      <div className='px-6 py-2 text-left'>
        <div className='font-bold text-base mb-2'>{podcast.collectionName}</div>
        <p className='text-gray-600 text-xs' >{podcast.artistName}</p>
      </div>
    </div>
  )
}

export default Podcast