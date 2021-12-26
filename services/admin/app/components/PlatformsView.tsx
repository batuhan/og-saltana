import { useState } from 'react'
import { Link } from 'remix'

const checkError = ({ checkResult }) => {
  if (checkResult.database.ok !== true) {
    return true
  }
  if (checkResult.elasticsearch.ok !== true) {
    return true
  }
  if (checkResult.cache.ok !== true) {
    return true
  }
}
function AccordionTableItem(props) {

  const [open, setOpen] = useState(false);

  const hasError = checkError(props)
  return (
    <tbody className="text-sm">
      <tr>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="flex items-center text-gray-800">

            <div className="font-bold text-gray-800">
              <Link to={`/root/${props.id}`} > Platform {props.id}</Link></div>
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-left font-medium text-green-500">{props.test.dbSchema} | {props.live.dbSchema} </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          {!props.checkResult.database.ok && <div className="inline-flex font-medium bg-red-100 text-red-600 rounded-full text-center px-2.5 py-0.5">DB Error</div>}
          {!props.checkResult.elasticsearch.ok && <div className="inline-flex font-medium bg-red-100 text-red-600 rounded-full text-center px-2.5 py-0.5">ElasticSearch Error</div>}
          {!props.checkResult.cache.ok && <div className="inline-flex font-medium bg-red-100 text-red-600 rounded-full text-center px-2.5 py-0.5">Cache Error</div>}
          {!hasError && <div className="inline-flex font-medium bg-yellow-100 text-yellow-600 rounded-full text-center px-2.5 py-0.5">Perfect</div>}
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-center">{props.items}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-left">{props.location}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="flex items-center">
            <svg className="w-4 h-4 fill-current text-gray-400 flex-shrink-0 mr-2" viewBox="0 0 16 16">
              <path d="M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z" />
            </svg>
            <div>{props.type}</div>
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
          <div className="flex items-center">

            <button
              className={`text-gray-400 hover:text-gray-500 transform ${open && 'rotate-180'}`}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              aria-controls={`description-${props.id}`}
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
      <tr id={`description-${props.id}`} role="region" className={`${!open && 'hidden'}`}>
        <td colSpan="10" className="px-2 first:pl-5 last:pr-5 py-3">
          <div className="flex items-center bg-gray-50 p-3 -mt-3">
            <svg className="w-4 h-4 flex-shrink-0 fill-current text-gray-400 mr-2">
              <path d="M1 16h3c.3 0 .5-.1.7-.3l11-11c.4-.4.4-1 0-1.4l-3-3c-.4-.4-1-.4-1.4 0l-11 11c-.2.2-.3.4-.3.7v3c0 .6.4 1 1 1zm1-3.6l10-10L13.6 4l-10 10H2v-1.6z" />
            </svg>
            <div className="overflow-ellipsis">
              <span>check result</span>

              <pre className="flex-wrap">{JSON.stringify(props.checkResult, null, 2)}</pre>
              <span>live env</span>
              <pre>{JSON.stringify(props.live, null, 2)}</pre>
              <span>test env</span>

              <pre>{JSON.stringify(props.test, null, 2)}</pre>

            </div>
          </div>
        </td>
      </tr>
    </tbody >
  );
}

export default function PlatformsView({ platforms }) {
  return (
    <div>
      <h2 className="text-2xl text-gray-800 font-bold mb-6">Deployed Platforms</h2>
      <div className="rounded-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="table-auto w-full divide-y divide-gray-200">
            {
              platforms.map((item) => {
                return (
                  <AccordionTableItem
                    key={item.id}
                    id={item.id}
                    test={item.test}
                    live={item.live}
                    checkResult={item.checkResult}
                  />
                )
              })
            }
          </table>
        </div>
      </div>
    </div >)

}
