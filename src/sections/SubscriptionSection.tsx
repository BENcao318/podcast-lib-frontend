import serverAPI from '../hooks/useAxios'
import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import Subscriptions from '../components/Subscriptions'
import { getSubscriptions } from '../redux/subscription'

import {ReduxStateInterface} from '../utils/interfaces'

interface Props {
}

const SubscriptionSection: React.FC<Props> = () => {
  const dispatch = useDispatch()
  const subscriptions = useSelector((state: ReduxStateInterface) => state.subscription.subscriptions)

  useEffect(() => {
    serverAPI
      .get(`/subscriptions`)
      .then((response) => {
        if (response.data) dispatch(getSubscriptions(response.data))
      })
      .catch((error) => {
        console.log(error)
      })
  }, [dispatch])

  return (
    <section className="w-8/12 gap-12 justify-self-center">
      <div className="mt-8 mb-12 text-3xl font-bold">Your Subscriptions:</div>
      <Subscriptions subscriptions={subscriptions} />
      <div className="h-36"></div>
    </section>
  )
}

export default SubscriptionSection
