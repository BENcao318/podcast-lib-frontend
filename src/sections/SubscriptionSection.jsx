import serverAPI from '../hooks/useAxios'
import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import Subscriptions from '../components/Subscriptions'
import { getSubscriptions } from '../redux/subscription'

const SubscriptionSection = () => {
  const dispatch = useDispatch()
  const subscriptions = useSelector((state) => state.subscription.subscriptions)

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
    <section className="w-full gap-12 lg:w-8/12 justify-self-center">
      <div className="mt-6 mb-12 text-3xl font-bold">Your Subscriptions:</div>
      <Subscriptions subscriptions={subscriptions} />
      <div className="h-36"></div>
    </section>
  )
}

export default SubscriptionSection
