import 'twin.macro'

import { HomeIcon, PlusIcon, SearchIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { useForm, useFormContext } from 'react-hook-form'
import getServerSidePropsForCreatorDashboardPages from '@/server/getServerSidePropsForCreatorDashboardPages'
import useApiMutation from 'hooks/useApiMutation'
import useCurrentUser from 'hooks/useCurrentUser'
import React, { Suspense, useMemo } from 'react'
import useCreatorSpace from 'hooks/useCreatorSpace'
import AssetScreen from 'components/Dashboard/Creator/Assets/AssetScreen'
import DashboardShell from 'components/Dashboard/Common/Shell'
import CreatorDashboardAssetSubHeader from 'components/Dashboard/Creator/Assets/Header'

export default function CreatorDashboardAssetScreen() {
  const router = useRouter()
  const { creator, asset, isLoading } = useCreatorSpace()

  return (
    <DashboardShell
      asset={asset}
      subHeader={<CreatorDashboardAssetSubHeader asset={asset} />}
    >
      <AssetScreen assetId={asset.data.id} />
    </DashboardShell>
  )
}

export const getServerSideProps = getServerSidePropsForCreatorDashboardPages()
