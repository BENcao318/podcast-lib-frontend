import React, { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ReactComponent as MoreLogo } from '../assets/more.svg'

const SignOutPopover = ({ logout }) => {
  return (
    <div className="absolute mt-3 inset-x-56">
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`
              ${open ? '' : 'text-opacity-80'}
              group-hover:text-sky-600 inline-flex hover:text-opacity-100`}
            >
              <MoreLogo className='w-6 h-6 p-1 rounded-full cursor-pointer fill-neutral-600 hover:bg-gray-200' />
              {/* <MoreLogo className='absolute w-6 h-6 p-1 mt-1 rounded-full cursor-pointer inset-x-56 fill-neutral-600 hover:bg-gray-200' onClick={() => logout()} /> */}
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
              <Popover.Panel
                className="absolute z-10 px-4 py-1 mt-3 font-semibold transform -translate-x-8 -translate-y-3 rounded cursor-pointer w-max bg-neutral-200 lg:max-w-3xl hover:bg-neutral-400"
                onClick={() => logout()}
              >
                <div className="relative">
                  Sign out
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}

export default SignOutPopover