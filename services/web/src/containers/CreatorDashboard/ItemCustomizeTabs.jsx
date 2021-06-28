import tw, { styled } from 'twin.macro'

const tabs = [
  { name: 'Basic Information', href: '#', current: true },
  { name: 'Delivery', href: '#', current: false },
  { name: 'Workflows', href: '#', current: false },
  { name: 'Preview', href: '#', current: false },
]


export default function ItemCustomizeTabs() {
  return (
    <div>
      <div tw="sm:hidden">
        <label htmlFor="tabs" tw="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          tw="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          defaultValue={tabs.find((tab) => tab.current).name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div tw="hidden sm:block">
        <nav tw="relative z-0 rounded-lg shadow flex divide-x divide-gray-200" aria-label="Tabs">
          {tabs.map((tab, tabIdx) => (
            <a
              key={tab.name}
              href={tab.href}
              css={[
                tab.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                tabIdx === 0 ? 'rounded-l-lg' : '',
                tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                'group',
                tw` relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10`
              ]}
              aria-current={tab.current ? 'page' : undefined}
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                css={[
                  tab.current ? 'bg-indigo-500' : 'bg-transparent',
                  tw`absolute inset-x-0 bottom-0 h-0.5`
                ]}
              />
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
