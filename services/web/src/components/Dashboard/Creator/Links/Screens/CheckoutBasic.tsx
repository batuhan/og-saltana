import useCreatorSpace from 'hooks/useCreatorSpace'
import { useFormContext } from 'react-hook-form'
import ContentEditor from 'components/ContentEditor/ContentEditor'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CheckoutBasic() {
  const { register, control, setValue } = useFormContext()

  const { creator, link, asset } = useCreatorSpace()

  return (
    <form className="space-y-8 divide-y divide-gray-200 min-w-full">
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div className="sm:col-span-4">
            <label
              htmlFor="destination"
              className="block text-sm font-medium text-gray-700"
            >
              Assets
            </label>
            <div className="mt-1">
              <input
                type="url"
                {...register('destination', {
                  required: true,
                })}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-6">sdfs</div>
          </div>
        </div>

        <div className="pt-8">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Description
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              You can add galleris, videos, and more to this link.
            </p>
          </div>
          <div className="mt-6 flex min-w-full">
            <ContentEditor fieldName="link.content" />
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  )
}
