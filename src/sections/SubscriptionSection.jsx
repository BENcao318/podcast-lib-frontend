import serverAPI from '../hooks/useAxios'
import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import Subscriptions from '../components/Subscriptions'
import { getSubscriptions } from '../redux/subscription'

const SubscriptionSection = () => {
  const dispatch = useDispatch()
  const subscriptions = useSelector((state) => state.subscription.subscriptions)

  useEffect(() => {
    serverAPI.get(`/subscriptions`)
      .then((response) => {
        if (response.data) dispatch(getSubscriptions(response.data));
      })
      .catch((error) => {
        console.log(error);
      })
  }, [dispatch])

  return (
    <section className='justify-self-center gap-12 w-8/12'>
      <div className='font-bold text-3xl mt-8 mb-12'>
        Your Subscriptions:
      </div >
      <Subscriptions subscriptions={subscriptions} />
      <div className='h-36'></div>
    </section >
  )
}

export default SubscriptionSection