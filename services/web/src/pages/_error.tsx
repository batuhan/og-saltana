import ErrorPage from 'components/ErrorPage'

function WrapperErrorPage(props) {
  return <ErrorPage {...props} />
}

WrapperErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default WrapperErrorPage
