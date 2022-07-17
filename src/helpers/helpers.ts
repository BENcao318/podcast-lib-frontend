import { genres } from '../utils/consts'

export const timeSince = (date: number): string => {
  const seconds = Math.floor((new Date().valueOf() - date.valueOf()) / 1000)
  let interval = seconds / 31536000

  if (interval > 1) {
    return `${Math.floor(interval)} years ago`
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return `${Math.floor(interval)} months ago`
  }
  interval = seconds / 86400
  if (interval > 2) {
    return `${Math.floor(interval)} days ago`
  } else if (interval > 1) {
    return `${Math.floor(interval)} day ago`
  }
  interval = seconds / 3600
  if (interval > 2) {
    return `${Math.floor(interval)} hours ago`
  } else if (interval > 1) {
    return `${Math.floor(interval)} hour ago`
  }
  interval = seconds / 60
  if (interval > 2) {
    return `${Math.floor(interval)} minutes ago`
  } else if (interval > 1) {
    return `${Math.floor(interval)} minute ago`
  }
  return `${Math.floor(seconds)} seconds ago`
}

export const convertDateFormat = (dateToConvert: string): string => {
  const date = dateToConvert.split('T')[0]
  const [year, month, day] = date.split('-')
  let monthAbbreviation = ''

  switch (month) {
    case '01':
      monthAbbreviation = 'JAN'
      break
    case '02':
      monthAbbreviation = 'FEB'
      break
    case '03':
      monthAbbreviation = 'MAR'
      break
    case '04':
      monthAbbreviation = 'APR'
      break
    case '05':
      monthAbbreviation = 'MAY'
      break
    case '06':
      monthAbbreviation = 'JUN'
      break
    case '07':
      monthAbbreviation = 'JUL'
      break
    case '08':
      monthAbbreviation = 'AUG'
      break
    case '09':
      monthAbbreviation = 'SEP'
      break
    case '10':
      monthAbbreviation = 'OCT'
      break
    case '11':
      monthAbbreviation = 'NOV'
      break
    case '12':
      monthAbbreviation = 'DEC'
      break
    default:
      monthAbbreviation = 'ABBRMONT'
      break
  }

  return `${monthAbbreviation} ${day}, ${year}`
}

export const convertMillisecToHrMin = (millisec: number): string => {
  const minutes = Math.floor(millisec / 60000) % 60
  const hours =
    Math.floor(millisec / 60000) / 60 >= 1
      ? Math.floor(Math.floor(millisec / 60000) / 60)
      : 0

  return (
    (hours !== 0 ? hours + ' hr ' : '') + (minutes > 0 ? minutes + ' min ' : '')
  )
}

export const convertSecToHrMinSec = (sec: number): string => {
  const seconds =
    Math.floor(sec % 60) < 10
      ? Math.floor(sec % 60)
          .toString()
          .padStart(2, '0')
      : Math.floor(sec % 60).toString()
  const minutes =
    Math.floor(sec / 60) % 60 < 10
      ? (Math.floor(sec / 60) % 60).toString().padStart(2, '0')
      : (Math.floor(sec / 60) % 60).toString()
  const hours =
    Math.floor(sec / 60) / 60 >= 1
      ? Math.floor(Math.floor(sec / 60) / 60)
          .toString()
          .padStart(2, '0')
      : 0

  return (
    (hours !== 0 ? hours + ':' : '') +
    (minutes + ':') +
    (seconds || (Number(minutes) !== 0) !== false ? seconds : '')
  )
}

interface convertEpisodeDataNamingArgs {
  episode_url?: string
  artwork_url_600?: string
  episode_name?: string
  description?: string
  genres?: string[]
  track_id?: number
  track_time_millis?: number
  collection_name?: string
  collection_id?: number
  release_date?: Date
}

export const convertEpisodeDataNaming = (
  queue: convertEpisodeDataNamingArgs
): any => {
  const episode = {
    episodeUrl: queue.episode_url,
    artworkUrl160: queue.artwork_url_600,
    trackName: queue.episode_name,
    description: queue.description,
    genres: queue.genres,
    trackId: queue.track_id,
    trackTimeMillis: queue.track_time_millis,
    collectionName: queue.collection_name,
    collectionId: queue.collection_id,
    releaseDate: queue.release_date,
  }
  return episode
}

interface convertQueueDataNamingArgs {
  episodeUrl?: string
  artworkUrl600?: string
  episode_name?: string
  description?: string
  genres?: string[]
  trackId?: number
  trackTimeMillis?: number
  collectionName?: string
  collectionId?: number
  releaseDate?: string
  trackName?: string
}

export const convertQueueDataNaming = (
  episode: convertQueueDataNamingArgs
): any => {
  const queue = {
    episode_name: episode.trackName,
    description: episode.description,
    artwork_url_600: episode.artworkUrl600,
    genres: episode.genres,
    track_id: episode.trackId,
    track_time_millis: episode.trackTimeMillis,
    episode_url: episode.episodeUrl,
    collection_name: episode.collectionName,
    release_date: episode.releaseDate,
    collection_id: episode.collectionId,
  }
  return queue
}

interface checkGenresInterface {
  name: string
  id: number
}

export const checkGenres = (
  podcastGenres: string[]
): checkGenresInterface[] => {
  const genreArr: checkGenresInterface[] = []
  genres.forEach((genre) => {
    if (podcastGenres.includes(genre.name)) {
      genreArr.push(genre)
    }
  })
  return genreArr
}

export const genreBackgroundColor = (genre: string): string => {
  switch (genre) {
    case 'Kids':
      return 'bg-green-800'
    case 'Design':
      return 'bg-gray-800'
    case 'Comedy':
      return 'bg-amber-800'
    case 'True Crime':
      return 'bg-red-800'
    case 'Arts':
      return 'bg-neutral-800'
    case 'Business':
      return 'bg-orange-800'
    case 'History':
      return 'bg-yellow-800'
    case 'Religion':
      return 'bg-lime-800'
    case 'Politics':
      return 'bg-emerald-800'
    case 'Technology':
      return 'bg-teal-800'
    case 'Sports':
      return 'bg-red-800'
    case 'Science':
      return 'bg-cyan-800'
    case 'Society & Culture':
      return 'bg-sky-800'
    case 'News':
      return 'bg-emerald-800'
    case 'Philosophy':
      return 'bg-purple-800'
    case 'Government':
      return 'bg-pink-800'
    default:
      return 'bg-indigo-800'
  }
}
