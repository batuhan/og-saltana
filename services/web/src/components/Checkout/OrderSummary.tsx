import React, { useState } from 'react'

import { Disclosure } from '@headlessui/react'
import { formatAmountForDisplay } from '@/client/stripe'
const subtotal = '$210.00'
const taxes = '$23.68'
const shipping = '$22.00'

function TransactionLine({
  id,
  assetSnapshot: { name, price, currency, description },
}) {
  const [open, setOpen] = useState(false);

  return (
    <tbody className="text-sm">
      <tr>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="flex items-center text-gray-800">
            <div className="font-medium text-gray-800">{name}</div>
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-left font-medium text-green-500">{formatAmountForDisplay(
            price,
            currency.toLowerCase(),
          )}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
          <div className="flex items-center">
            <button
              className={`text-gray-400 hover:text-gray-500 transform ${open && 'rotate-180'}`}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              aria-controls={`description-${id}`}
            >
              <span className="sr-only">Menu</span>
              <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                <path d="M16 20l-5.4-5.4 1.4-1.4 4 4 4-4 1.4 1.4z" />
              </svg>
            </button>
          </div>
        </td>
      </tr>
      {/*
      Example of content revealing when clicking the button on the right side:
      Note that you must set a "colSpan" attribute on the <td> element,
      and it should match the number of columns in your table
      */}
      <tr id={`description-${id}`} role="region" className={`${!open && 'hidden'}`}>
        <td colSpan={10} className="px-2 first:pl-5 last:pr-5 py-3">
          <div className="flex items-center bg-gray-50 p-3 -mt-3">
            <svg className="w-4 h-4 flex-shrink-0 fill-current text-gray-400 mr-2">
              <path d="M1 16h3c.3 0 .5-.1.7-.3l11-11c.4-.4.4-1 0-1.4l-3-3c-.4-.4-1-.4-1.4 0l-11 11c-.2.2-.3.4-.3.7v3c0 .6.4 1 1 1zm1-3.6l10-10L13.6 4l-10 10H2v-1.6z" />
            </svg>
            <div className="italic">{description}</div>
          </div>
        </td>
      </tr>
    </tbody>
  );
}

export default function OrderSummary({ totalAmount, transactions }) {
  return (
    <table className="table-auto w-full divide-y divide-gray-200">
      {transactions.map((transaction) => (
        <TransactionLine key={transaction.id} {...transaction} />
      ))}
    </table>
  )
}
