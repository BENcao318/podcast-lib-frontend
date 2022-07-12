import React, { useCallback } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import serverAPI from '../hooks/useAxios'

import { ReactComponent as SearchIcon } from '../assets/search-icon.svg'

const SearchBar = ({ searchResult, setSearchResult }) => {
  const [searchInput, setSearchInput] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const handleChange = (e) => {
    setSearchInput(e.target.value)
  }

  const getPodcasts = useCallback(
    (searchInput) => {
      const search_text = searchInput
      if (search_text) {
        serverAPI.post(`/search`, { search_text }).then((response) => {
          setSearchResult({
            ...searchResult,
            podcasts: JSON.parse(response.data.podcasts).results,
            episodes: JSON.parse(response.data.episodes).results,
          })
          if (location.pathname !== '/search') {
            navigate('/search')
          }
        })
      }
    },
    [navigate, location.pathname, searchResult, setSearchResult]
  )

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      getPodcasts(searchInput)
    },
    [getPodcasts, searchInput]
  )

  return (
    <div className="fixed top-0 z-30 w-1/2 place-self-center">
      <form>
        <div className="flex content-center">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="h-6" />
          </div>
          <input
            type="search"
            value={searchInput}
            onChange={handleChange}
            className="block w-full p-4 pl-10 text-sm text-gray-900 bg-gray-100 border rounded-lg border-neutral-600 focus:ring-sky-600 focus:border-sky-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search podcasts, episodes..."
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchBar
