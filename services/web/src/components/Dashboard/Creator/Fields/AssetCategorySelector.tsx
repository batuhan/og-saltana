import { ListChoice, InputField, Popover } from '@kiwicom/orbit-components'

import useApi from 'hooks/useApi'
import useAssetCategories from 'hooks/useAssetCategories'
import React, { useMemo, useState } from 'react'
import { useWatch } from 'react-hook-form'

export default function AssetCategorySelector({
  control,
  register,
  setValue,
  FIELD_NAME = 'asset.categoryId',
}) {
  const assetCategories = useAssetCategories({})
  const assetCategoryId = register(FIELD_NAME, { required: true })
  const selectedCategoryId = useWatch({
    control,
    name: FIELD_NAME,
  })

  const [opened, setOpened] = useState(false)

  const handleClick = (id) => {
    setValue(FIELD_NAME, id)
    setOpened(false)
  }

  const assetCategoryChoices = useMemo(() => {
    if (assetCategories.data?.length === 0) {
      return []
    }
    return assetCategories.data.map(({ id, name }) => (
      <ListChoice
        key={id}
        description="23 km from city center"
        onClick={() => handleClick(id)}
        title={name}
      />
    ))
  }, [assetCategories])

  const selectedCategory = useMemo(
    () => assetCategories.data?.find((type) => type.id === selectedCategoryId),
    [selectedCategoryId, assetCategories],
  )

  return (
    <Popover
      content={assetCategoryChoices}
      noPadding
      opened={opened}
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
    >
      <input
        type="text"
        name={FIELD_NAME}
        id={FIELD_NAME}
        readOnly
        value={selectedCategory?.name}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
      />
    </Popover>
  )
}
