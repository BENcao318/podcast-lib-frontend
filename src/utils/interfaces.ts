export interface QueueInterface {
  episode_name: string
  description: string
  artwork_url_600: string
  genres: (number | string)[]
  track_id: number
  track_time_millis: number
  episode_url: string
  collection_name: string
  release_date: Date | number
  collection_id: number
}

export interface EpisodeInterface {
  episodeUrl: string
  artworkUrl600: string
  episode_name: string
  description: string
  genres: string[]
  trackId: number
  trackTimeMillis: number
  collectionName: string
  collectionId: number
  releaseDate: string
  trackName: string
  artworkUrl160: string
}

export interface ReduxStateInterface {
  episodePlayer: any
  user: any
  subscription: any
  queue: any
}

export interface PodcastInterface {
  collectionId: number
  artistName: string
  artworkUrl600: string
  collectionName: string
}

export interface PodcastDetailsInterface {
  releaseDate: string
  collectionName: string
  description: string
  artistName: string
  artworkUrl600: string
  genreIds: number[]
  genres: string[]
  trackId: number
  collectionViewUrl: string
}

export interface SubscriptionInterface {
  art_work_url_600: string
  name: string
  artist_name: string
  track_id: number
}

export interface SearchResultInterface {
  podcasts: PodcastInterface[]
  episodes: EpisodeInterface[]
}
