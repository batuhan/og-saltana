import 'twin.macro'

export default function AssetPriceField({ register }) {
  return (
    <div>
      <label htmlFor="asset.price" tw="block text-sm font-medium text-gray-700">
        Price
      </label>
      <div tw="mt-1 relative rounded-md shadow-sm">
        <div tw="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span tw="text-gray-500 sm:text-sm">$</span>
        </div>
        <input
          type="text"
          {...register('asset.price', {
            required: true,
          })}
          id="asset.price"
          tw="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
          placeholder="0.00"
        />
        <div tw="absolute inset-y-0 right-0 flex items-center">
          <label htmlFor="asset.currency" tw="sr-only">
            Currency
          </label>
          <select
            id="asset.currency"
            {...register('asset.currency', {
              required: true,
            })}
            tw="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
          >
            <option>USD</option>
            <option>EUR</option>
            <option>TRY</option>
          </select>
        </div>
      </div>
    </div>
  )
}
