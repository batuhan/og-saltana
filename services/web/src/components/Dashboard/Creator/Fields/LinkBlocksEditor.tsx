import * as React from 'react'
import Select, { Option } from 'rc-select'
import { ListChoice } from '@kiwicom/orbit-components'

const LinkBlocksEditor = (props) => {
  return (
    <>
      <Select>
        <Option value="jack">
          <ListChoice
            description="Further description"
            icon={<span>sdfs</span>}
            onClick={function () {}}
            selectable
            title="jack"
          />
        </Option>
        <Option value="asad">
          <ListChoice
            description="Further description"
            icon={<span>sdfs</span>}
            onClick={function () {}}
            selectable
            title="asad"
          />
        </Option>
        <Option value="xzcvsdrf">
          <ListChoice
            description="Further description"
            icon={<span>sdfs</span>}
            onClick={function () {}}
            selectable
            title="xzcvsdrf"
          />
        </Option>
      </Select>
    </>
  )
}

export default LinkBlocksEditor
