import { NextSeo } from 'next-seo'
import { DefaultLink } from 'components/Links'
import Link from 'next/link'
import ErrorPage from 'components/ErrorPage'

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
