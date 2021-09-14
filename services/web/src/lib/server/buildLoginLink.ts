export default function buildLoginLink({ resolvedUrl }) {
  return `/login?redirectTo=${resolvedUrl}`
}
