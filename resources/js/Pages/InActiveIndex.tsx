import React from 'react'
import {router} from "@inertiajs/react";

export default function InActiveIndex() {
  const logout = () => {
    router.post(route('logout'))
  }

  return (
    <>
      <div className='min-h-screen flex justify-center items-center'>
        <div className='p-4 shadow-sm border'>
          <div className='my-4 font-bold'>
            Account is not yet activated.
          </div>

          <div>
            <button type="button"
                    onClick={logout}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium
                    rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700
                    focus:outline-none dark:focus:ring-blue-800">
              LOGOUT
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
