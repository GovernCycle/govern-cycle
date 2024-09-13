import { InternetIdentityButton, useAuth } from '@bundly/ares-react'
import Link from 'next/link'
import React from 'react'

const User : string = "something"

export const Navbar = () => {
  const { isAuthenticated, currentIdentity } = useAuth();

  return (
    <header className="fixed flex justify-center z-10 top-0 h-20  w-full ">
          
    <div className=" h-full  w-[1200px] shadow bg-slate-50 mt-10 rounded-full bg-primary-50 bg-opacity-80 backdrop-blur ">


      <div className="flex h-full items-center max-w-full max-sm:justify-end justify-between px-7">
            <span>
                <Link href="/">
                        DAO 
                </Link>
            </span>
         

            <InternetIdentityButton className="bg-slate-700">
            Log in
          </InternetIdentityButton>
          
        </div>
        </div>
    </header>
  )
}
