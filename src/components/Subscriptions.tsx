import React from 'react'
import Subscription from './Subscription'

import { SubscriptionInterface } from '../utils/interfaces'

interface Props {
  subscriptions: SubscriptionInterface[]
}

const Subscriptions: React.FC<Props> = ({ subscriptions }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {subscriptions &&
        subscriptions.map((subscription: SubscriptionInterface) => (
          <Subscription
            subscription={subscription}
            key={subscription.track_id}
          />
        ))}
    </div>
  )
}

export default Subscriptions
