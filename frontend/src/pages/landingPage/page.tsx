import { CenteredPageWrapper } from '@app/components/layouts/center-page-wrapper'
import React from 'react'

const LandingPage = () => {
  return (
    <>
      <main className="bg-[url('/landing3.jpg')] bg-cover bg-center min-h-screen">
        <CenteredPageWrapper>
          <div className="h-[800px] grid grid-cols-2 items-center text-white">
            {/* Columna de contenido a la izquierda */}
            <div className="flex justify-center items-center w-[600px] h-full">
              <div className="text-center">
                <h1 className="text-5xl font-bold bg-gradient-to-tr from-orange-600 via-orange-300 to-red-400 text-transparent bg-clip-text">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                </h1>
                <p className="mt-4 font-bold">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam magnam est, recusandae reiciendis doloribus non nemo eius voluptates sint quidem tenetur, odit quod sunt sed qui officiis beatae aspernatur at!
                </p>
              </div>
            </div>

            {/* Columna del logo a la derecha */}
            <div className="flex justify-center items-center h-full">
              <img src="/landing-log2.svg" alt="Logo" className="max-w-full h-auto" />
            </div>
          </div>
        </CenteredPageWrapper>
      </main>
    </>
  )
}


export default LandingPage;
