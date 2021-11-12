import * as React from 'react'
import CreatorSpaceShell from 'components/CreatorSpace/Shell'
import AuthRequiredShell from 'components/CreatorSpace/AuthRequiredShell'
import getStaticPropsForCreatorSpacePages from '@/server/getStaticPropsForCreatorSpacePages'
import { useRouter } from 'next/router'
import { useSession } from '@clerk/nextjs'

import useApi from 'hooks/useApi'
import { uniq } from 'lodash'

const TransactionLine = ({ transactionId }) => {
  const transaction = useApi('transactions', 'read', transactionId)
  return <pre>{JSON.stringify(transaction)}</pre>
}

const OrderView = () => {
  const router = useRouter()

  const [session, loading] = useSession()
  const order = useApi('orders', 'read', router.query.orderId, {
    enabled: session ? true : false,
  })

  const transactionIds = uniq(
    (order.data?.lines || []).map(({ transactionId }) => transactionId),
  )

  console.log({ order, transactionIds })

  const transactions = transactionIds.map((transactionId) => (
    <TransactionLine key={transactionId} transactionId={transactionId} />
  ))

  return (
    <CreatorSpaceShell>
      <AuthRequiredShell>transactions: {transactions}</AuthRequiredShell>
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

export default OrderView
