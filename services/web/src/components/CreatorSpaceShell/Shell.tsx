import {
  Box,
  Grid,
  Flex,
  Text,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import * as React from 'react'
import { CardWithAvatar } from './CardWithAvatar'
import { HiPencilAlt } from 'react-icons/hi'
import { UserInfo } from './UserInfo'
/* This example requires Tailwind CSS v2.0+ */
import { SpeakerphoneIcon, XIcon } from '@heroicons/react/outline'
import tw, { styled } from 'twin.macro'
import { Logo } from '../Logo'



const CreatorSpaceShell = ({
  children,
  creatorId,
  mode,
  assetId,
  editModeEnabled,
  avatarSrc,
  displayName,
  description,
  createdDate,
  canEdit,
}) => {
  return (
    <>
    <main tw="grid place-items-center min-h-screen bg-gradient-to-t from-blue-200 to-indigo-900 p-5">
  <div>
    <h1 tw="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-200 mb-5">{displayName}</h1>
    <p tw="text-2xl sm:text-2xl md:text-3xl  text-gray-200 mb-5">{description} j</p>

    <section tw="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div tw="bg-gray-900 shadow-lg rounded p-3">
        <div className="group" tw="relative">
          <img tw="w-full md:w-72 block rounded" src="https://upload.wikimedia.org/wikipedia/en/f/f1/Tycho_-_Epoch.jpg" alt="" />
          <div tw="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">
            <button tw="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
              a
            </button>

            <button tw="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
              b
            </button>

            <button tw="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
              c
            </button>
          </div>
        </div>
        <div tw="p-5">
          <h3 tw="text-white text-lg">Epoch</h3>
          <p tw="text-gray-400">Tycho</p>
        </div>
      </div>
      <div tw="bg-gray-900 shadow-lg rounded p-3">
        <div className="group" tw=" relative">
          <img tw="w-full md:w-72 block rounded" src="https://upload.wikimedia.org/wikipedia/en/c/ca/Tycho_-_Awake.png" alt="" />
          <div tw="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">
            <button tw="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
              f
            </button>

            <button tw="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
             g
            </button>

            <button tw="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
              h
            </button>
          </div>
        </div>
        <div tw="p-5">
          <h3 tw="text-white text-lg">Awake</h3>
          <p tw="text-gray-400">Tycho</p>
        </div>
      </div>
      <div tw="bg-gray-900 shadow-lg rounded p-3">
        <div className="group" tw=" relative">
          <img tw="w-full md:w-72 block rounded" src="https://upload.wikimedia.org/wikipedia/en/1/11/Dive_tycho_album.jpg" alt="" />
          <div tw="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">
            <button tw="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
             g
            </button>

            <button tw="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
             b
            </button>

            <button tw="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
             zs
            </button>
          </div>
        </div>
        <div tw="p-5">
          <h3 tw="text-white text-lg">Dive</h3>
          <p tw="text-gray-400">Tycho</p>
        </div>
      </div>
    </section>
  </div>
</main>
      <section tw="text-black ">
        <div tw="container items-center px-5 py-8 mx-auto">
          <div tw="flex flex-col mb-12 text-left">
            <div tw="w-full mx-auto ">
              <div tw="p-6">
                <div tw="w-full mx-auto my-4 bg-white border rounded-lg shadow-xl ">
                  <div tw="p-6">
                    <h1 tw="mb-8 text-2xl font-bold leading-none tracking-tighter text-black lg:text-3xl  ">
                      {displayName}
                    </h1>
                    <p tw="mb-3 text-base leading-relaxed ">{description}</p>

                    <p tw="text-xs font-semibold tracking-widest text-black uppercase ">
                      FROM Istanbul, Turkey
                    </p>
                    <p tw="text-xs font-semibold tracking-widest text-black uppercase ">
                      Identity Verified
                    </p>
                  </div>
                </div>
                <div tw="w-full mx-auto my-4 bg-black border rounded-lg shadow-xl ">
                  <div tw="p-4">
                    <Logo h="4" fill="white" />
                    <p tw="my-4 text-sm font-semibold tracking-widest text-white uppercase ">
                      {displayName} uses Saltana, a Swiss Army knife for digital
                      creators.
                    </p>
                    <button tw="text-base font-medium text-white transition duration-500 ease-in-out transform border-black rounded-md bg-black focus:outline-none focus:ring-2 ring-offset-current ring-offset-2  ">
                Learn more ->
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </>
  )
}

export default CreatorSpaceShell
