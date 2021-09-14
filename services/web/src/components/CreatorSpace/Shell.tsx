import * as React from 'react'
import { NextSeo } from 'next-seo'

import useCreatorSpace from 'hooks/useCreatorSpace'
import { Logo } from '../Logo'
/* <main className=" grid place-items-center min-h-screen bg-gradient-to-t from-blue-200 to-indigo-900 p-5">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-200 mb-5">
              {creator.data?.displayName}
            </h1>
            <p className="text-2xl sm:text-2xl md:text-3xl  text-gray-200 mb-5">
              {creator.data?.description}
            </p>

            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-900 shadow-lg rounded p-3">
                <div className="group" className="relative">
                  <img
                    className="w-full md:w-72 block rounded"
                    src="https://upload.wikimedia.org/wikipedia/en/f/f1/Tycho_-_Epoch.jpg"
                    alt=""
                  />
                  <div className="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">
                    <button className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
                      a
                    </button>

                    <button className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
                      b
                    </button>

                    <button className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
                      c
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-white text-lg">Epoch</h3>
                  <p className="text-gray-400">Tycho</p>
                </div>
              </div>
              <div className="bg-gray-900 shadow-lg rounded p-3">
                <div className="group" className=" relative">
                  <img
                    className="w-full md:w-72 block rounded"
                    src="https://upload.wikimedia.org/wikipedia/en/c/ca/Tycho_-_Awake.png"
                    alt=""
                  />
                  <div className="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">
                    <button className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
                      f
                    </button>

                    <button className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
                      g
                    </button>

                    <button className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
                      h
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-white text-lg">Awake</h3>
                  <p className="text-gray-400">Tycho</p>
                </div>
              </div>
              <div className="bg-gray-900 shadow-lg rounded p-3">
                <div className="group" className=" relative">
                  <img
                    className="w-full md:w-72 block rounded"
                    src="https://upload.wikimedia.org/wikipedia/en/1/11/Dive_tycho_album.jpg"
                    alt=""
                  />
                  <div className="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">
                    <button className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
                      g
                    </button>

                    <button className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
                      b
                    </button>

                    <button className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
                      zs
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-white text-lg">Dive</h3>
                  <p className="text-gray-400">Tycho</p>
                </div>
              </div>
            </section>
          </div>
  </main> */
const CreatorSpaceShell = ({ children, mode = 'withLayout' }) => {
  const { creator, link, isLink } = useCreatorSpace()
  const showLayout = mode !== 'embed'
  const title = isLink ? link.data?.label : creator.data?.displayName

  return (
    <>
      <NextSeo title={title} />
      {showLayout ? (
        <section className="text-black ">
          <div className="container items-center px-5 py-8 mx-auto">
            <div className="flex flex-col mb-12 text-left">
              <div className="w-full mx-auto ">
                <div className="p-6">
                  <div className="w-full mx-auto my-4 bg-white border rounded-lg shadow-xl ">
                    <div className="p-6">
                      <h1 className="mb-8 text-2xl font-bold leading-none tracking-tighter text-black lg:text-3xl  ">
                        {creator.data?.displayName}
                      </h1>
                      <p className="mb-3 text-base leading-relaxed ">
                        {creator.data?.description}
                      </p>

                      <p className="text-xs font-semibold tracking-widest text-black uppercase ">
                        FROM Istanbul, Turkey
                      </p>
                      <p className="text-xs font-semibold tracking-widest text-black uppercase ">
                        Identity Verified
                      </p>
                    </div>
                  </div>

                  <div className="w-full mx-auto my-7 p-5 border rounded-lg shadow-xl ">
                    {children}
                  </div>
                  <div className="w-full mx-auto my-4 bg-black border rounded-lg shadow-xl ">
                    <div className="p-4">
                      <Logo h="4" fill="white" />
                      <p className="my-4 text-sm font-semibold tracking-widest text-white uppercase ">
                        {creator.data?.displayName} uses Saltana, a Swiss Army
                        knife for digital creators.
                      </p>
                      <button className="text-base font-medium text-white transition duration-500 ease-in-out transform border-black rounded-md bg-black focus:outline-none focus:ring-2 ring-offset-current ring-offset-2  ">
                        Learn more &gt;
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        children
      )}
    </>
  )
}

export default CreatorSpaceShell
