import dynamic from 'next/dynamic'

function Empty() {
  return null
}

const HookFormDevTool = dynamic(
  () => import('@hookform/devtools').then((mod) => mod.DevTool),
  { ssr: false },
)

export default function HookFormDevTools(props) {
  return <HookFormDevTool {...props} />
  return <Empty />
  if (process.env.NODE_ENV !== 'development' || !props.control) {
  }
}
