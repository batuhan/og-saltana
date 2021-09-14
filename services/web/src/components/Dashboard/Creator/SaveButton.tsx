import { useFormContext } from 'react-hook-form'

export default function SaveButton() {
  const {
    register,
    formState: { isDirty, isSubmitting, isValid },
  } = useFormContext()

  return (
    <button
      type="submit"
      disabled={!isDirty || isSubmitting}
      className={`
        ${(!isDirty || isSubmitting) && 'disabled:opacity-50'}

        bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900

      `}
    >
      {isSubmitting ? 'Saving' : 'Save'} {!isValid && 'SOMETHING IS WRONG'}
    </button>
  )
}
