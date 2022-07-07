import React from 'react'
import { useNavigate } from 'react-router-dom'
import { checkGenres, genreBackgroundColor } from '../helpers/helpers'

const GenreBox = ({ podcastGenres }) => {
  const genres = checkGenres(podcastGenres)
  const navigate = useNavigate()

  return (
    <div className='flex gap-2 mx-2 items-center'>
      {
        genres.map((genre) => (
          <div key={genre.id} className={`${genreBackgroundColor(genre.name)} text-semibold text-white rounded-xl p-1 w-24 cursor-pointer`} onClick={() => navigate(`/genres/${genre.name}/${genre.id}`)}>
            {genre.name}
          </div>
        )
        )
      }
    </div>

  )
}

export default GenreBox