import useApi from 'hooks/useApi'
import 'twin.macro'

export default function AssetCategoryField({ register }) {
  const categories = useApi('categories', 'list', {})
  return (
    <div>
      <label
        htmlFor="asset.categoryId"
        tw="block text-sm font-medium text-gray-700"
      >
        Category
      </label>
      <div tw="mt-1">
        <select
          id="asset.categoryId"
          {...register('asset.categoryId', {
            required: true,
          })}
          tw="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {categories.data.map(({ name, id }) => {
            return (
              <option key={id} value={id}>
                {name}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}
