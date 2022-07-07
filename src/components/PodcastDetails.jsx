import serverAPI from '../hooks/useAxios'
import React, { useEffect, useState, useCallback, useRef } from 'react'
import { timeSince } from '../helpers/helpers'
import { useDispatch, useSelector } from 'react-redux';
import { addSubscription, removeSubscription, getSubscriptions } from '../redux/subscription'

import plus from '../assets/plus.svg'
import link from '../assets/link.svg'
import checkedLogo from '../assets/checkedLogo.svg'
import GenreBox from './GenreBox';

const PodcastDetails = ({ podcastDetails }) => {
  const [releaseDate, setReleaseDate] = useState('')
  const [isReadMore, setIsReadMore] = useState(false)
  const [warning, setWarning] = useState(false)
  const timeoutRef = useRef()   // For creating a subscription warning when the user is not logged in
  const dispatch = useDispatch()
  const subscriptions = useSelector((state) => state.subscription.subscriptions)
  const userStatus = useSelector((state) => state.user)

  useEffect(() => {
    const date = Date.parse(podcastDetails.releaseDate)
    setReleaseDate(timeSince(date))
  }, [podcastDetails.releaseDate])

  const handleClick = () => {
    setIsReadMore(true);
  }

  const subscribe = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (userStatus.logged_in) {
      const podcast_to_subscribe = {
        name: podcastDetails.collectionName,
        description: podcastDetails.description,
        artist_name: podcastDetails.artistName,
        art_work_url_600: podcastDetails.artworkUrl600,
        genre_ids: podcastDetails.genreIds,
        genres: podcastDetails.genres,
        track_id: podcastDetails.trackId
      }

      serverAPI.post(`/subscribe`, { podcast_to_subscribe })
        .then((response) => {
          dispatch(addSubscription(podcast_to_subscribe))
        })
    } else {
      setWarning(true)
      timeoutRef.current = setTimeout(() => {
        setWarning(false)
      }, 2000)
    }
  }, [podcastDetails, dispatch, userStatus.logged_in])

  const unSubscribe = useCallback(() => {
    const podcast_to_unsubscribe = podcastDetails.collectionName

    serverAPI.post(`/unsubscribe`, { podcast_to_unsubscribe })
      .then((response) => {
        dispatch(removeSubscription(podcastDetails.collectionName))
      })
  }, [podcastDetails, dispatch])

  useEffect(() => {
    if (userStatus.logged_in) {
      serverAPI.get(`/subscriptions`)
        .then((response) => {
          if (response.data) dispatch(getSubscriptions(response.data));
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, [dispatch, userStatus.logged_in])

  return (
    Object.keys(podcastDetails).length !== 0 &&
    <div className='grid grid-cols-1 gap-y-2 max-w-xs h-full'>
      <img src={podcastDetails.artworkUrl600} alt="podcast cover" className='max-w-xs rounded-lg' />
      <p className='text-left pl-3'>{releaseDate}</p>
      <div className='flex justify-center gap-4'>
        {
          subscriptions.some((subscription) => subscription.name === podcastDetails.collectionName) ?
            <div className='border border-sky-600 rounded-xl bg-sky-600 cursor-pointer text-white hover:bg-sky-200' onClick={unSubscribe}>
              <span className='flex items-center px-2 py-0.5 mx-2 font-semibold'><img src={checkedLogo} alt="subscribed button" className='w-6 mr-1' />Subscribed</span>
            </div>
            :
            <div className='border border-sky-600 rounded-xl cursor-pointer hover:bg-sky-200' onClick={subscribe}>
              <span className='flex items-center px-2 py-0.5 mx-2 font-semibold'><img src={plus} alt="subscribe button" className='w-6 mr-1' />Subscribe</span>
            </div>
        }
        <div className='border border-sky-600 rounded-xl cursor-pointer hover:bg-sky-200'>
          <a className='flex items-center px-2 py-0.5 mx-2 font-semibold' href={podcastDetails.collectionViewUrl}><img src={link} alt="internet button" className='w-6 mr-1' />visit website</a>
        </div>
      </div>
      {warning &&
        <div className='bg-sky-600 font-base rounded-xl text-neutral-200 text-lg py-2'>
          Please log in before subscribe
        </div>
      }
      <hr className="border-1 border-gray-600" />
      <div className='flex justify-start my-2'>
        <GenreBox podcastGenres={podcastDetails.genres} />
      </div>
      <p className='text-left px-3'>
        {isReadMore ? podcastDetails.description : podcastDetails.description.slice(0, 123) + '...'}
      </p>
      <span className='underline cursor-pointer text-sky-600 font-semibold text-right' onClick={handleClick}>
        {isReadMore ? '' : <span>read more</span>}
      </span>
    </div>
  )
}

export default PodcastDetails