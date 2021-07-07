import 'twin.macro'
import tw, { styled } from 'twin.macro'

import { lighten } from 'polished'
import dynamic from 'next/dynamic'
import embeds from '../Editor/embeds'
import theme from '../Editor/theme'
const RichMarkdownEditor = dynamic(() => import('rich-markdown-editor'), {
  ssr: false,
})

const StyledEditor = styled(RichMarkdownEditor)`
  flex-grow: ${(props) => (props.grow ? 1 : 0)};
  justify-content: start;

  > div {
    background: transparent;
  }

  & * {
    box-sizing: content-box;
  }

  .notice-block.tip,
  .notice-block.warning {
    font-weight: 500;
  }

  .heading-anchor {
    box-sizing: border-box;
  }

  .heading-name {
    pointer-events: none;
    display: block;
    position: relative;
    top: -60px;
    visibility: hidden;
  }

  .heading-name:first-child {
    & + h1,
    & + h2,
    & + h3,
    & + h4 {
      margin-top: 0;
    }
  }

  p {
    a {
      color: ${(props) => props.theme.text};
      border-bottom: 1px solid ${(props) => lighten(0.5, props.theme.text)};
      text-decoration: none !important;
      font-weight: 500;

      &:hover {
        border-bottom: 1px solid ${(props) => props.theme.text};
        text-decoration: none;
      }
    }
  }
`

export default function RichContentField({ register }) {
  return (
    <div>
      <StyledEditor embeds={embeds} theme={theme} />
    </div>
  )
}
