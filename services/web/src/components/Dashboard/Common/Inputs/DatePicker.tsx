export default function CreatorRichContentField({ register, username }) {
  return (
    <>
      <Controller
        control={control}
        name="ReactDatepicker"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <ReactDatePicker
            onChange={onChange}
            onBlur={onBlur}
            selected={value}
          />
        )}
      />
      <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
        Link
      </label>
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        <div className="max-w-lg flex rounded-md shadow-sm">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300  text-gray-500 sm:text-sm">
            saltana.com/{username}/
          </span>
          <input
            type="text"
            id="slug"
            {...register('slug', {
              required: true,
            })}
            autoComplete="slug"
            className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
          />
        </div>
      </div>
    </>
  )
}
