import useCurrentUser from './useCurrentUser'

export default function useFeatureFlag() {
  const { data } = useCurrentUser()
}
