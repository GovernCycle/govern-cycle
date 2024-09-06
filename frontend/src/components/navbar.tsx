import Link from 'next/link'
import React from 'react'

const User : string = "something"

export const Navbar = () => {
  return (
    <header className='fixed flex justify-center bg-white-heat bg-opacity-50 backdrop-blur w-full h-20 z-10 shadow'>

        <div className='flex h-full items-center w-[1200px] bg-black bg-opacity-20 max-w-full max-sm:justify-end '>
            <span>
                <Link href="/">
                        DAO 
                </Link>
            </span>
        </div>
    </header>
  )
}
