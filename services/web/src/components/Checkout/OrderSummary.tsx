import React, { useState } from 'react'

import { Disclosure } from '@headlessui/react'
const subtotal = '$210.00'
const taxes = '$23.68'
const shipping = '$22.00'

function AssetLine({ id, name, price, currency, description }) {
  return (
    <li className="flex py-6 space-x-6">
      <div className="flex flex-col justify-between space-y-4">
        <div className="text-sm font-medium space-y-1">
          <h3 className="text-gray-900">{name}</h3>
          <p className="text-gray-900">
            {price} {currency}
          </p>
          <p className="text-gray-500">{description}</p>
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
      <div className="flex items-center justify-between">
        <h2 id="order-heading" className="text-lg font-medium text-gray-900">
          Your Order {totalUniqueItems}
        </h2>
        <Disclosure.Button className="font-medium text-indigo-600 hover:text-indigo-500">
          {open ? (
            <span>Hide full summary</span>
          ) : (
            <span>Show full summary</span>
          )}
        </Disclosure.Button>
      </div>

      <Disclosure.Panel>
        <ul
          role="list"
          className="divide-y divide-gray-200 border-b border-gray-200"
        >
          {assets.map((asset) => (
            <AssetLine key={asset.id} {...asset} />
          ))}
        </ul>

        <dl className="text-sm font-medium text-gray-500 mt-10 space-y-6">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd className="text-gray-900">{subtotal}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Taxes</dt>
            <dd className="text-gray-900">{taxes}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Shipping</dt>
            <dd className="text-gray-900">{shipping}</dd>
          </div>
        </dl>
      </Disclosure.Panel>

      <p className="flex items-center justify-between text-sm font-medium text-gray-900 border-t border-gray-200 pt-6 mt-6">
        <span className="text-base">Total</span>
        <span className="text-base">{cartTotal}</span>
      </p>
    </>
  )
}
