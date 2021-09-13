import { ListChoice, InputField, Popover } from '@kiwicom/orbit-components'
import useApi from 'hooks/useApi'
import useAssetTypes from 'hooks/useAssetTypes'
import React, { useMemo, useState } from 'react'
import { useWatch } from 'react-hook-form'
import 'twin.macro'

export default function AssetTypeSelector({
  control,
  register,
  setValue,
  FIELD_NAME = 'asset.assetTypeId',
}) {
  const assetTypes = useAssetTypes({})

  const [opened, setOpened] = useState(false)

  const handleClick = (id) => {
    setValue(FIELD_NAME, id)
    setOpened(false)
  }

  const assetTypeChoices = useMemo(() => {
    if (assetTypes.data?.length === 0) {
      return []
    }
    return assetTypes.data.map(({ id, name }) => (
      <ListChoice
        key={id}
        description="23 km from city center"
        onClick={() => handleClick(id)}
        title={name}
      />
    ))
  }, [assetTypes])

  const assetTypeId = register(FIELD_NAME, { required: true })
  const selectedTypeId = useWatch({
    control,
    name: FIELD_NAME,
  })

  const selectedType = useMemo(
    () => assetTypes.data?.find((type) => type.id === selectedTypeId),
    [selectedTypeId, assetTypes],
  )

  return (
    <Popover
      content={assetTypeChoices}
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
        value={selectedType?.name}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
      />
    </Popover>
  )
}
