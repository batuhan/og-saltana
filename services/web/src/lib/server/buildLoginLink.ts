export default function buildLoginLink({ resolvedUrl }) {
  return `/login?callbackUrl=${resolvedUrl}`
}
