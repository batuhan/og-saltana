/* eslint-disable react/jsx-props-no-spreading */
import Document, {
  Html,
  Main,
  NextScript,
  DocumentContext,
  Head,
} from 'next/document'
import React from 'react'
import { createGetInitialProps } from '@mantine/next'

const getInitialProps = createGetInitialProps()

export default class MyDocument extends Document {
  static getInitialProps = getInitialProps;


  render() {
    return (
      <Html >
        <Head />

        <body >
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
