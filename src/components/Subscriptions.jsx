import React from 'react'
import Subscription from './Subscription'

const Subscriptions = ({ subscriptions }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {subscriptions.map((subscription) => (
        <div key={subscription.track_id}>
          <Subscription subscription={subscription} />
        </div>
      ))}
    </div>
  )
}

export default Subscriptions
