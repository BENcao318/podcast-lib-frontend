import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/solid'
import { useNavigate } from 'react-router-dom'

import { genres } from '../utils/consts'

const GenresPopover = () => {
  const navigate = useNavigate()

  const handleClick = (genreId, genreName) => {
    navigate(`/genres/${genreName}/${genreId}`)
  }

  return (
    <div className="w-full max-w-sm px-2 ml-2 top-16">
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : 'text-opacity-80'}
                group-hover:text-sky-600 inline-flex hover:text-opacity-100`}
            >
              <span>Browse By Genres</span>
              <ChevronRightIcon
                className={`${
                  open ? 'visible' : 'rotate-90 transform invisible'
                }
                   ml-2 h-5 w-5 text-sky-600 inline-flex self-center transition duration-150 ease-in-out group-hover:text-opacity-80 group-hover:visible`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 max-w-sm mt-3 transform translate-x-48 w-max -translate-y-14 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg shadow-xl ring-2 ring-black ring-opacity-5">
                  <div className="relative grid gap-6 p-6 bg-white lg:grid-cols-2">
                    {genres.map((item) => (
                      <div
                        key={item.name}
                        className="p-2 -m-2 transition duration-150 ease-in-out rounded-lg hover:bg-sky-400 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        onClick={() => {
                          close()
                          handleClick(item.id, item.name)
                        }}
                      >
                        <p className="text-lg font-medium text-center text-gray-900">
                          {item.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}

export default GenresPopover
