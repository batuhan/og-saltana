
import { ErrorMessage } from '@hookform/error-message';

export default function GenericFormFieldError({ errors, fieldName, className = '' }) {
  const classNameExt = `text-red-500 text-sm mt-2 ${className || ""}`

  return <ErrorMessage
    errors={errors}
    name={fieldName}
    render={({ message }) => <p className={classNameExt}>
      {message}  :(
    </p>}
  />

}