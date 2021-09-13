export default function AssetPriceField({
  register,
  priceFieldName = 'asset.price',
  currencyFieldName = 'asset.currency',
}) {
  return (
    <div className="mt-1 relative rounded-md shadow-sm  block w-full border">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="text-gray-500 sm:text-sm">$</span>
      </div>
      <input
        type="text"
        {...register(priceFieldName, {
          required: true,
        })}
        id={priceFieldName}
        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
        placeholder="0.00"
      />
      <div className="absolute inset-y-0 right-0 flex items-center">
        <label htmlFor={currencyFieldName} className="sr-only">
          Currency
        </label>
        <select
          id={currencyFieldName}
          {...register(currencyFieldName, {
            required: true,
          })}
          className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
        >
          <option>USD</option>
          <option>EUR</option>
          <option>TRY</option>
        </select>
      </div>
    </div>
  )
}
