import React from 'react'
import { useNavigate } from 'react-router'

function Subscription({ subscription }) {
  const navigate = useNavigate()

  function handleClick() {
    navigate(`/podcasts/${subscription.track_id}`)
  }

  return (
    <div className='max-w-xs overflow-hidden rounded-xl shadow-2xl mx-3 mb-4 bg-neutral-100 cursor-pointer hover:border-2 border-sky-600' onClick={handleClick}>
      <img className='w-full' src={subscription.art_work_url_600} alt={`subscription Cover ${subscription.artist_name}`} />
      <div className='px-6 py-2 text-left'>
        <div className='font-bold text-base mb-2'>{subscription.name}</div>
        <p className='text-gray-600 text-xs' >{subscription.artist_name}</p>
      </div>
    </div>
  )
}

export default Subscription