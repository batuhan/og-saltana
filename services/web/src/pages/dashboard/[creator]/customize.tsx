import _ from 'lodash'
import getServerSidePropsForCreatorDashboardPages from '@/server/getServerSidePropsForCreatorDashboardPages'
import { NextSeo } from 'next-seo'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import useCurrentUser from 'hooks/useCurrentUser'
import useUpdateCurrentUser from 'hooks/useUpdateCurrentUser'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import CreatorDashboardSettingsShell from 'components/Dashboard/Creator/SettingsShell'
import CreatorSlugField from 'components/Dashboard/Common/Inputs/CreatorPageSlug'
import { useState } from 'react'
import classnames from '@/common/classnames'

const Editor = dynamic(
  () => import('components/ContentEditor/Editor/EditorWrapper'),
  {
    ssr: false,
  },
)
const Uploader = dynamic(
  () => import('components/ContentEditor/Editor/Uploader'),
  {
    ssr: false,
  },
)

function CustomizeCreatorSpace() {
  const user = useCurrentUser()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    defaultValues: {
      ..._.pick(user.data, [
        'firstname',
        'lastname',
        'description',
        'username',
        'displayName',
      ]),
      metadata: {
        instant: _.pick(user.data?.metadata?.instant || {}, [
          'avatarUrl',
          'coverUrl',
        ]),
      },
    },
  })

  async function onSuccess() {
    router.push(`/dashboard`)
  }

  const [isAvatarUrlModalOpen, setAvatarUrlModalOpen] = useState(false)
  const [isCoverUrlModalOpen, setCoverUrlModalOpen] = useState(false)
  const avatarUrl = watch('metadata.instant.avatarUrl')
  const coverUrl = watch('metadata.instant.coverUrl')
  const updateUserSettings = useUpdateCurrentUser({ onSuccess })

  async function onSubmit(data) {
    await updateUserSettings.mutateAsync(data)
  }

  return (
    <form
      className="space-y-8 divide-y divide-gray-200"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    saltana.com/
                  </span>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    {...register('username', {
                      required: true,
                    })}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                    placeholder="RickAstley"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="displayName"
                className="block text-sm font-medium text-gray-700"
              >
                Display Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  {...register('displayName', {
                    required: true,
                  })}
                  id="displayName"
                  className="block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  {...register('description', {
                    required: true,
                  })}
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  defaultValue=""
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Write a few sentences about yourself.
              </p>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="avatarUrl"
                className="block text-sm font-medium text-gray-700"
              >
                Profile Media (photo or video)
              </label>
              <div className="mt-1 flex items-center">
                <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  <img src={avatarUrl} />
                </span>
                <button
                  type="button"
                  onClick={() => setAvatarUrlModalOpen(true)}
                  className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Change
                </button>
              </div>
              <Uploader
                open={isAvatarUrlModalOpen}
                onRequestClose={() => setAvatarUrlModalOpen(false)}
                onTransloaditResult={(result) => {
                  setAvatarUrlModalOpen(false)

                  setValue(
                    'metadata.instant.avatarUrl',
                    result.response.uploadURL,
                  )
                  console.log(result, 'onTransloaditResult for avatar url')
                }}
              />
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="coverUrl"
                className="block text-sm font-medium text-gray-700"
              >
                Cover Photo
              </label>
              <div className="mt-1 flex items-center">
                <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  <img src={coverUrl} />
                </span>
                <button
                  type="button"
                  onClick={() => setCoverUrlModalOpen(true)}
                  className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Change
                </button>
              </div>
              <Uploader
                open={isCoverUrlModalOpen}
                onRequestClose={() => setCoverUrlModalOpen(false)}
                onTransloaditResult={(result) => {
                  setCoverUrlModalOpen(false)

                  setValue(
                    'metadata.instant.coverUrl',
                    result.response.uploadURL,
                  )
                  console.log(result, 'onTransloaditResult')
                }}
              />
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="cover_photo"
                className="block text-sm font-medium text-gray-700"
              >
                Links
              </label>
              <div className="mt-1 w-full ">
                <Editor />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !isDirty}
            className={classnames(
              (isSubmitting || !isDirty) && `disabled:opacity-50`,
              `ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`,
            )}
          >
            {isSubmitting ? 'Saving...' : isDirty ? 'Save' : 'Saved'}
          </button>
        </div>
      </div>
    </form>
  )
}

export default function CreatorDashboardCustomize() {
  return (
    <CreatorDashboardSettingsShell>
      <NextSeo title="Customize Creator Space" />
      <CustomizeCreatorSpace />
    </CreatorDashboardSettingsShell>
  )
}

export const getServerSideProps = getServerSidePropsForCreatorDashboardPages()
