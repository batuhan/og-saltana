import { ListChoice, InputField, Popover } from '@kiwicom/orbit-components'
import useApi from 'hooks/useApi'
import useAssetTypes from 'hooks/useAssetTypes'
import React, { useMemo, useState } from 'react'
import { useWatch } from 'react-hook-form'
import 'twin.macro'

export default function AssetTypeSelector({ control, register, setValue }) {
  const FIELD_NAME = 'asset.assetTypeId'
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
      <InputField
        inlineLabel
        label="Asset Type"
        readOnly
        value={selectedType?.name}
      />
    </Popover>
  )
}
