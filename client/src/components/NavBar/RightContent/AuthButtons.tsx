import React from 'react'
import { Button } from 'react-bootstrap'

export default function AuthButtons() {
  return (
    <div className='flex gap-x-1 justify-center items-center'>
       <Button variant="" className='w-20 mt-1 hidden sm:flex w-[70px] justify-center md:w-[110px] h-7 items-center  ml-2 rounded-full text-blue  border-1 border-sky-600  hover:bg-blue-500  ' >Log in</Button>{' '}
       <Button variant="" className='w-20 mt-1 hidden sm:flex w-[80px] justify-center md:w-[110px] h-7 items-center rounded-full text-white  border-1 bg-blue-500 border-sky-600  hover:bg-blue-500 ' >Sign up</Button>{' '}
        
    </div>
  )
}

