import useApi from 'hooks/useApi'

export default function CategoryName({ categoryId }) {
  const categories = useApi('categories', 'list', {})

  if (!categories) {
    return 'Loading'
  }

  const category = categories.data.find((c) => c.id === categoryId)
  return category ? category.name : 'Loading'
}
