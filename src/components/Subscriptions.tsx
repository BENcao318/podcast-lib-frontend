import React from 'react'
import Subscription from './Subscription'

import {SubscriptionInterface} from '../utils/interfaces'

interface Props {
  subscriptions: SubscriptionInterface[]
}

const Subscriptions: React.FC<Props> = ({ subscriptions }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {subscriptions.map((subscription: any) => (
        <div key={subscription.track_id}>
          <Subscription subscription={subscription} />
        </div>
      ))}
    </div>
  )
}

export default Subscriptions
