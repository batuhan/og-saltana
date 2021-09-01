import React, { useState } from 'react'
import tw from 'twin.macro'

import { Disclosure } from '@headlessui/react'
const subtotal = '$210.00'
const taxes = '$23.68'
const shipping = '$22.00'

function AssetLine({ id, name, price, currency, description }) {
  return (
    <li tw="flex py-6 space-x-6">
      <div tw="flex flex-col justify-between space-y-4">
        <div tw="text-sm font-medium space-y-1">
          <h3 tw="text-gray-900">{name}</h3>
          <p tw="text-gray-900">
            {price} {currency}
          </p>
          <p tw="text-gray-500">{description}</p>
        </div>
      </div>
    </li>
  )
}

export default function OrderSummary({
  open,
  assets,
  totalUniqueItems,
  cartTotal,
}) {
  return (
    <>
      <div tw="flex items-center justify-between">
        <h2 id="order-heading" tw="text-lg font-medium text-gray-900">
          Your Order {totalUniqueItems}
        </h2>
        <Disclosure.Button tw="font-medium text-indigo-600 hover:text-indigo-500">
          {open ? (
            <span>Hide full summary</span>
          ) : (
            <span>Show full summary</span>
          )}
        </Disclosure.Button>
      </div>

      <Disclosure.Panel>
        <ul role="list" tw="divide-y divide-gray-200 border-b border-gray-200">
          {assets.map((asset) => (
            <AssetLine key={asset.id} {...asset} />
          ))}
        </ul>

        <dl tw="text-sm font-medium text-gray-500 mt-10 space-y-6">
          <div tw="flex justify-between">
            <dt>Subtotal</dt>
            <dd tw="text-gray-900">{subtotal}</dd>
          </div>
          <div tw="flex justify-between">
            <dt>Taxes</dt>
            <dd tw="text-gray-900">{taxes}</dd>
          </div>
          <div tw="flex justify-between">
            <dt>Shipping</dt>
            <dd tw="text-gray-900">{shipping}</dd>
          </div>
        </dl>
      </Disclosure.Panel>

      <p tw="flex items-center justify-between text-sm font-medium text-gray-900 border-t border-gray-200 pt-6 mt-6">
        <span tw="text-base">Total</span>
        <span tw="text-base">{cartTotal}</span>
      </p>
    </>
  )
}
