import { useMyAssets } from '@/hooks/useAssets'
import { useEffect } from 'react'
import MiniSearch from 'minisearch'
import Select from 'react-select'
import { useFormContext, Controller } from 'react-hook-form'
import AssetCategorySelector from '../../Fields/AssetCategorySelector'
import useAsset from '@/hooks/useAsset'

/**
 * Quick Asset Selector for Links
 */

const teams = [
  {
    name: 'kitap',
    handle: 'asswet',
    role: 'Co-Founder / CEO',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Michael Foster',
    handle: 'michaelfoster',
    role: 'Co-Founder / CTO',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Dries Vincent',
    handle: 'driesvincent',
    role: 'Manager, Business Relations',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Lindsay Walton',
    handle: 'lindsaywalton',
    role: 'Front-end Developer',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]
function useAssetSearch() {
  const assets = useMyAssets()
  let miniSearch = new MiniSearch({
    fields: ['name', 'text'], // fields to index for full-text search
    storeFields: ['name', 'category'], // fields to return with search results
  })

  useEffect(() => {
    if (assets.data && assets.data.length > 0) {
      miniSearch.addAll(assets.data)
    }
  }, [assets])

  return { search: miniSearch, assets }
}

function AssetBox({ assetId }) {
  const asset = useAsset(assetId)
  return (
    <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500">
      {/*<div className="flex-shrink-0">
    <img
      className="h-10 w-10 rounded-full"
      src={person.imageUrl}
      alt=""
    />
  </div>*/}
      <div className="flex-1 min-w-0">
        <a href="#" className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <p className="text-sm font-medium text-gray-900">
            {asset.data?.name}
          </p>
          <p className="text-sm text-gray-500 truncate">{asset.data?.price}</p>
        </a>
      </div>
    </div>
  )
}
const QuickAssetSelector = ({ fieldName }) => {
  const { search, assets } = useAssetSearch()
  const options = assets.data.map((asset) => ({
    value: asset.id,
    label: asset.name,
  }))

  const { register, setValue, watch, control } = useFormContext()
  const value = watch(fieldName)

  useEffect(() => {
    register(fieldName, { required: true })
  }, [register, fieldName])

  const parsedValue = value || []

  return (
    <div className="mt-8 max-w-5xl mx-auto pb-12">
      <h2 className="text-sm font-medium text-gray-500">Linked</h2>

      <Controller
        control={control}
        defaultValue={parsedValue}
        name={fieldName}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Select
            inputRef={ref}
            classNamePrefix="addl-class"
            options={options}
            value={options.find((c) => c.value === value)}
            onChange={(newValue) => onChange([...parsedValue, newValue.value])}
          />
        )}
      />
      <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {parsedValue.map((id) => (
          <AssetBox key={id} assetId={id} />
        ))}
      </div>
    </div>
  )
}

export default QuickAssetSelector
function encodeContent(newValue: any) {
  throw new Error('Function not implemented.')
}
