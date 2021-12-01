import CreatorSpaceShell from 'components/CreatorSpace/Shell'
import getStaticPropsForCreatorSpacePages from '@/server/getStaticPropsForCreatorSpacePages'
import useCreatorSpace from 'hooks/useCreatorSpace'
import CheckoutForm from 'components/Checkout/CheckoutForm'

const CreatorSpaceLinkCheckout = () => {
  const { link } = useCreatorSpace()

  return (
    <CreatorSpaceShell>
      <CheckoutForm assetIds={link.data.assetIds} />
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

export default CreatorSpaceLinkCheckout
