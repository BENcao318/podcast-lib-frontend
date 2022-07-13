import React from 'react'
import Subscription from './Subscription'

const Subscriptions = ({ subscriptions }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {subscriptions &&
        subscriptions.map((subscription) => (
          <Subscription
            subscription={subscription}
            key={subscription.track_id}
          />
        ))}
    </div>
  )
}

export default Subscriptions
