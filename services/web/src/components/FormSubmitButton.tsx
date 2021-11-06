

export default function FormSubmitButton({ isLoading, className, text, textWhenLoading, ...props }) {
  return <button
    type="submit"
    disabled={isLoading}
    className={className}
    {...props}
  >
    {isLoading
      ? (textWhenLoading || text)
      : text}
  </button>
}