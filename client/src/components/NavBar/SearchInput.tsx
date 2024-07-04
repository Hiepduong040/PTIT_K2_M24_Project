import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

export default function SearchInput() {
  return (
    <div className="flex w-full items-center justify-center"> {/* Sử dụng w-full để container cha chiếm toàn bộ chiều rộng */}
      <div className="w-full"> {/* Đảm bảo container của input có chiều rộng đầy đủ */}
        <div className="relative ml-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
          </div>
          <input 
            type="text" 
            name="search" 
            id="search" 
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset hover:ring-gray-500 focus:ring-gray-600 sm:text-sm sm:leading-6" 
            placeholder=" Search Habbit"
          />
        </div>
      </div>
    </div>
  )
}
