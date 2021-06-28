import tw, { styled } from 'twin.macro'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { LinkIcon, PlusIcon, QuestionMarkCircleIcon } from '@heroicons/react/solid'

const team = [
  {
    name: 'Tom Cook',
    email: 'tomcook@example.com',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Whitney Francis',
    email: 'whitneyfrancis@example.com',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Leonard Krasner',
    email: 'leonardkrasner@example.com',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Floyd Miles',
    email: 'floydmiles@example.com',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Emily Selman',
    email: 'emilyselman@example.com',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]

export default function AssetForm() {
  const [open, setOpen] = useState(true)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" static tw="fixed inset-0 overflow-hidden" open={open} onClose={setOpen}>
        <div tw="absolute inset-0 overflow-hidden">
          <Dialog.Overlay tw="absolute inset-0" />

          <div tw="fixed inset-y-0 pl-16 max-w-full right-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div tw="w-screen max-w-md">
                <form tw="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
                  <div tw="flex-1 h-0 overflow-y-auto">
                    <div tw="py-6 px-4 bg-indigo-700 sm:px-6">
                      <div tw="flex items-center justify-between">
                        <Dialog.Title tw="text-lg font-medium text-white">New Project</Dialog.Title>
                        <div tw="ml-3 h-7 flex items-center">
                          <button
                            type="button"
                            tw="bg-indigo-700 rounded-md text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={() => setOpen(false)}
                          >
                            <span tw="sr-only">Close panel</span>
                            <XIcon tw="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div tw="mt-1">
                        <p tw="text-sm text-indigo-300">
                          Get started by filling in the information below to create your new project.
                        </p>
                      </div>
                    </div>
                    <div tw="flex-1 flex flex-col justify-between">
                      <div tw="px-4 divide-y divide-gray-200 sm:px-6">
                        <div tw="space-y-6 pt-6 pb-5">
                          <div>
                            <label htmlFor="project_name" tw="block text-sm font-medium text-gray-900">
                              Project name
                            </label>
                            <div tw="mt-1">
                              <input
                                type="text"
                                name="project_name"
                                id="project_name"
                                tw="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="description" tw="block text-sm font-medium text-gray-900">
                              Description
                            </label>
                            <div tw="mt-1">
                              <textarea
                                id="description"
                                name="description"
                                rows={4}
                                tw="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                                defaultValue={''}
                              />
                            </div>
                          </div>
                          <div>
                            <h3 tw="text-sm font-medium text-gray-900">Team Members</h3>
                            <div tw="mt-2">
                              <div tw="flex space-x-2">
                                {team.map((person) => (
                                  <a key={person.email} href={person.href} tw="rounded-full hover:opacity-75">
                                    <img
                                      tw="inline-block h-8 w-8 rounded-full"
                                      src={person.imageUrl}
                                      alt={person.name}
                                    />
                                  </a>
                                ))}
                                <button
                                  type="button"
                                  tw="flex-shrink-0 bg-white inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-gray-200 text-gray-400 hover:text-gray-500 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                  <span tw="sr-only">Add team member</span>
                                  <PlusIcon tw="h-5 w-5" aria-hidden="true" />
                                </button>
                              </div>
                            </div>
                          </div>
                          <fieldset>
                            <legend tw="text-sm font-medium text-gray-900">Privacy</legend>
                            <div tw="mt-2 space-y-5">
                              <div tw="relative flex items-start">
                                <div tw="absolute flex items-center h-5">
                                  <input
                                    id="privacy_public"
                                    name="privacy"
                                    aria-describedby="privacy_public_description"
                                    type="radio"
                                    tw="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                    defaultChecked
                                  />
                                </div>
                                <div tw="pl-7 text-sm">
                                  <label htmlFor="privacy_public" tw="font-medium text-gray-900">
                                    Public access
                                  </label>
                                  <p id="privacy_public_description" tw="text-gray-500">
                                    Everyone with the link will see this project.
                                  </p>
                                </div>
                              </div>
                              <div>
                                <div tw="relative flex items-start">
                                  <div tw="absolute flex items-center h-5">
                                    <input
                                      id="privacy_private-to-project"
                                      name="privacy"
                                      aria-describedby="privacy_private-to-project_description"
                                      type="radio"
                                      tw="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                    />
                                  </div>
                                  <div tw="pl-7 text-sm">
                                    <label htmlFor="privacy_private-to-project" tw="font-medium text-gray-900">
                                      Private to project members
                                    </label>
                                    <p id="privacy_private-to-project_description" tw="text-gray-500">
                                      Only members of this project would be able to access.
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div tw="relative flex items-start">
                                  <div tw="absolute flex items-center h-5">
                                    <input
                                      id="privacy_private"
                                      name="privacy"
                                      aria-describedby="privacy_private-to-project_description"
                                      type="radio"
                                      tw="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                    />
                                  </div>
                                  <div tw="pl-7 text-sm">
                                    <label htmlFor="privacy_private" tw="font-medium text-gray-900">
                                      Private to you
                                    </label>
                                    <p id="privacy_private_description" tw="text-gray-500">
                                      You are the only one able to access this project.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </fieldset>
                        </div>
                        <div tw="pt-4 pb-6">
                          <div tw="flex text-sm">
                            <a
                              href="#"
                              className="group"
                              tw=" inline-flex items-center font-medium text-indigo-600 hover:text-indigo-900"
                            >
                              <LinkIcon
                                tw="h-5 w-5 text-indigo-500 group-hover:text-indigo-900"
                                aria-hidden="true"
                              />
                              <span tw="ml-2">Copy link</span>
                            </a>
                          </div>
                          <div tw="mt-4 flex text-sm">
                            <a href="#"
                              className="group" tw=" inline-flex items-center text-gray-500 hover:text-gray-900">
                              <QuestionMarkCircleIcon
                                tw="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                              />
                              <span tw="ml-2">Learn more about sharing</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div tw="flex-shrink-0 px-4 py-4 flex justify-end">
                    <button
                      type="button"
                      tw="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      tw="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
