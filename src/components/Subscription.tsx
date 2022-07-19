import React from 'react'
import { useNavigate } from 'react-router'

import { SubscriptionInterface } from '../utils/interfaces'

interface Props {
  subscription: SubscriptionInterface
}

const Subscription: React.FC<Props> = ({ subscription }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/podcasts/${subscription.track_id}`)
  }

  return (
    <div
      className="w-1/4 mx-3 mb-4 overflow-hidden shadow-2xl cursor-pointer min-w-60 lg:w-1/6 rounded-xl bg-neutral-100 hover:border-2 border-sky-600"
      onClick={handleClick}
    >
      <img
        className="w-full"
        src={subscription.art_work_url_600}
        alt={`subscription Cover ${subscription.artist_name}`}
      />
      <div className="px-6 py-2 text-left">
        <div className="mb-2 text-base font-bold">{subscription.name}</div>
        <p className="text-xs text-gray-600">{subscription.artist_name}</p>
      </div>
    </div>
  )
}

export default Subscription
