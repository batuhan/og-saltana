export default function Newsletter() {
  return (

    <div className="section--newsletter">
      <div className="row">
        <div className="col-12">
          <div className="section--newsletter__title">
            Want product news and updates?
          </div>
        </div>
        <div className="col-12">
          <div className="section--newsletter__description">
            Sign up for our newsletter to stay up to date.
          </div>
        </div>
        <div className="col-xl-8 col-lg-12 p-0 section--newsletter__input">
          <input
            className="appearance-none border rounded w-full p-3 leading-tight"
            type="text"
            placeholder="Enter your email"
          />
        </div>
        <div className="col-xl col-lg-12 section--newsletter__button">Notify Me</div>
        <div className="col-12 section--newsletter__privacy">
          We care about the protection of your data. Read our
          <a href="#" className="section--newsletter__privacy__link"
          >Privacy Policy.</a
          >
        </div>
      </div>
    </div>

  )
}
