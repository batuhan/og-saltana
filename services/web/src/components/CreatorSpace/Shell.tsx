import * as React from 'react'
import { NextSeo } from 'next-seo'

import useCreatorSpace from 'hooks/useCreatorSpace'
import { Logo } from '../Logo'

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
