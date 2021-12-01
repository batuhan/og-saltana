import CreatorSpaceShell from 'components/CreatorSpace/Shell'
import getStaticPropsForCreatorSpacePages from '@/server/getStaticPropsForCreatorSpacePages'
import useCreatorSpace from 'hooks/useCreatorSpace'
import CheckoutForm from 'components/Checkout/CheckoutForm'
import { useRouter } from 'next/router'

const CreatorSpaceAssetCheckout = () => {
  const { query } = useRouter()

  const assetIds = query.assetIds ? query.assetIds.split(',') : []

  return (
    <CreatorSpaceShell>
      <pre>{JSON.stringify(assetIds, null, 2)}</pre>
      <CheckoutForm assetIds={[...assetIds]} />
    </CreatorSpaceShell>
  )
}

export const getStaticProps = getStaticPropsForCreatorSpacePages()

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

export default CreatorSpaceAssetCheckout
