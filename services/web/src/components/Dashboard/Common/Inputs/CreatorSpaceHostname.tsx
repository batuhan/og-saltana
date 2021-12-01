import classNames from '@/common/classnames'
import GenericFormFieldError from 'components/GenericFormFieldError'
import { useEffect } from 'react'

export default function CreatorSpaceHostname({
  register,
  name = 'username',
  errors = {},
}) {

  // const hostname = watch(name)

  // useEffect(() => {

  //   console.log('hostname changed', hostname)
  // }, [hostname])
  return (
    <>

      <div className="mt-1 flex rounded-md shadow-sm">
        <input
          type="text"
          name={name}
          id={name}
          {...register(name)}
          className={`flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300
                              ${errors[name] && 'border-red-500'} `}
          placeholder="RickAstley"
        />
        <span className={`inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm
                            ${errors[name] && 'border-red-500'} `}
        >
          .saltana.com
        </span>
      </div>

      <GenericFormFieldError errors={errors} fieldName={name} />
    </>
  )
}
