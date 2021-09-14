import useCreatorSpace from 'hooks/useCreatorSpace'
import { useFormContext } from 'react-hook-form'
import ContentEditor from 'components/ContentEditor/ContentEditor'
import SaveButton from '../../SaveButton'
import * as React from 'react'
import Select, { Option } from 'rc-select'
import { ListChoice } from '@kiwicom/orbit-components'
import { debounce } from 'lodash'

function NewPicker() {
  const [selectedPrimrayColor, setSelectedPrimaryColor] = React.useState(null)
  const [searchText, setSearchText] = React.useState('')
  const [inputText, setInpuText] = React.useState('')
  const setSearchTextDebounced = React.useRef(
    debounce((searchText) => setSearchText(searchText), 500),
  ).current
  const [selectedSecondaryColor, setSelectedSecondaryColor] =
    React.useState(null)

  const { status: searchStatus, data: colorSearchResults } =
    useColorSearch(searchText)

  const { status: companionStatus, data: companionColors } = useSecondaryColor(
    selectedPrimrayColor?.id,
  )

  const handleChangePrimary = (selectedItem, event) => {
    setSelectedPrimaryColor(selectedItem)
    setSelectedSecondaryColor(null)
  }

  const handleInputChangePrimary = (inputText, event) => {
    // prevent outside click from resetting inputText to ""
    if (event.action !== 'input-blur' && event.action !== 'menu-close') {
      setInpuText(inputText)
      setSearchTextDebounced(inputText)
    }
  }

  const handleChangeSecondary = (selectedItem, event) => {
    setSelectedSecondaryColor(selectedItem)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(
      JSON.stringify(
        {
          primary: selectedPrimrayColor,
          secondary: selectedSecondaryColor,
        },
        null,
        2,
      ),
    )
  }

  const handleReset = () => {
    setSelectedPrimaryColor(null)
    setSelectedSecondaryColor(null)
    setSearchText('')
  }

  return (
    <div className="App">
      <h1>Color Search</h1>
      <div>Search Status: {searchStatus}</div>
      <div>Companion Status: {companionStatus}</div>
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
        <h2>Secondary Color</h2>
        <Select
          noOptionsMessage={() => 'Search for a primary color first'}
          placeholder={'Select a secondary color'}
          isClearable={true}
          isLoading={searchStatus === 'loading'}
          isSearchable={false}
          value={selectedSecondaryColor}
          options={companionColors}
          getOptionLabel={(color) => color.name}
          getOptionVale={(color) => color}
          onChange={handleChangeSecondary}
        />
        <button
          type="submit"
          disabled={!selectedPrimrayColor || !selectedSecondaryColor}
        >
          Submit
        </button>
        <button type="reset" onClick={handleReset}>
          Reset
        </button>
      </form>

      <ColorCombo
        selectedPrimrayColor={selectedPrimrayColor}
        selectedSecondaryColor={selectedSecondaryColor}
      />
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
            onClick={function () {}}
            selectable
            title="jack"
          />
        </Option>
        <Option value="asad">
          <ListChoice
            description="Further description"
            icon={<span>sdfs</span>}
            onClick={function () {}}
            selectable
            title="asad"
          />
        </Option>
        <Option value="xzcvsdrf">
          <ListChoice
            description="Further description"
            icon={<span>sdfs</span>}
            onClick={function () {}}
            selectable
            title="xzcvsdrf"
          />
        </Option>
      </Select>
    </>
  )
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CheckoutBasic() {
  const { register, control, setValue } = useFormContext()

  const { creator, link, asset } = useCreatorSpace()

  return (
    <div className="space-y-8 divide-y divide-gray-200 min-w-full">
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
          <div className="sm:col-span-4">
            <label
              htmlFor="destination"
              className="block text-sm font-medium text-gray-700"
            >
              Assets
            </label>
            <div className="mt-1">
              <AssetPicker />
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
          <SaveButton />
        </div>
      </div>
    </div>
  )
}
