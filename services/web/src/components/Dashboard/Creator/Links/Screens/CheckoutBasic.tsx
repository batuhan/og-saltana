import useCreatorSpace from 'hooks/useCreatorSpace'
import { useFormContext } from 'react-hook-form'
import ContentEditor from 'components/ContentEditor/ContentEditor'
import * as React from 'react'
import Select, { Option } from 'rc-select'
import { ListChoice } from '@kiwicom/orbit-components'
import { debounce } from 'lodash'
import { useMyAssets } from '@/hooks/useAssets'
import QuickAssetSelector from '../../Assets/Fields/QuickAssetSelector'

function NewPicker() {
  const [selectedPrimrayColor, setSelectedPrimaryColor] = React.useState(null)
  const [searchText, setSearchText] = React.useState('')
  const [inputText, setInpuText] = React.useState('')
  const setSearchTextDebounced = React.useRef(
    debounce((searchText) => setSearchText(searchText), 500),
  ).current
  const [selectedSecondaryColor, setSelectedSecondaryColor] =
    React.useState(null)

  const { status: searchStatus, data: colorSearchResults } = useMyAssets({
    query: searchText,
  })

  const handleChangePrimary = (selectedItem, event) => {
    setSelectedPrimaryColor(selectedItem)
  }

  const handleInputChangePrimary = (inputText, event) => {
    // prevent outside click from resetting inputText to ""
    if (event.action !== 'input-blur' && event.action !== 'menu-close') {
      setInpuText(inputText)
      setSearchTextDebounced(inputText)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(
      JSON.stringify(
        {
          primary: selectedPrimrayColor,
        },
        null,
        2,
      ),
    )
  }

  const handleReset = () => {
    setSelectedPrimaryColor(null)
    setSearchText('')
  }

  return (
    <div className="App">
      <h1>Color Search</h1>
      <div>Search Status: {searchStatus}</div>
      <form onSubmit={handleSubmit}>
        <h2>Primary Color</h2>
        <Select
          noOptionsMessage={() => 'No colors found'}
          placeholder={'Search for a color'}
          isClearable={true}
          isLoading={searchStatus === 'loading'}
          inputValue={inputText}
          value={selectedPrimrayColor}
          options={colorSearchResults}
          getOptionLabel={(color) => color.name}
          onChange={handleChangePrimary}
          onInputChange={handleInputChangePrimary}
        />
        <button type="submit" disabled={!selectedPrimrayColor}>
          Submit
        </button>
        <button type="reset" onClick={handleReset}>
          Reset
        </button>
      </form>

      <pre className="code">
        {JSON.stringify(selectedPrimrayColor, null, 2)}
      </pre>
    </div>
  )
}

const AssetPicker = (props) => {
  return (
    <>
      <Select className="border-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
        <Option value="jack">
          <ListChoice
            description="Further description"
            icon={<span>sdfs</span>}
            onClick={function () { }}
            selectable
            title="jack"
          />
        </Option>
        <Option value="asad">
          <ListChoice
            description="Further description"
            icon={<span>sdfs</span>}
            onClick={function () { }}
            selectable
            title="asad"
          />
        </Option>
        <Option value="xzcvsdrf">
          <ListChoice
            description="Further description"
            icon={<span>sdfs</span>}
            onClick={function () { }}
            selectable
            title="xzcvsdrf"
          />
        </Option>
      </Select>
    </>
  )
}

export default function CheckoutBasic() {
  const { register, control, setValue } = useFormContext()

  const { creator, link, asset } = useCreatorSpace()

  return (
    <div className="space-y-8 divide-y divide-gray-200 min-w-full">
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Assets
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Assets you selected are combined inside the checkout form in your
            link.
          </p>
          <QuickAssetSelector fieldName="assetIds" />
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
            <ContentEditor fieldName="content" />
          </div>
        </div>
      </div>


    </div>
  )
}
