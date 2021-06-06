import { InlineField } from 'react-tinacms-inline'

export default function InlineEditor(props) {
  return (
    <InlineField {...props}>
      {({ input }) => {
        if (cms.enabled) {
          <Editor
  defaultValue="Hello world!"
/>
          return <input type="text" {...input} />
        }
        return <h1>{input.value}</h1>
      }}
    </InlineField>
  )
}
