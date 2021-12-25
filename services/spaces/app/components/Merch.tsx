export default function Merch() {
  return (

    <div className="d-lg-block d-md-none">
      <div className="row">
        <div className="col-11"></div>
        <div className="col-1">
          <div className="section--merch__rate__box">
            <span className="section--merch__rate__box__text"> 4.8 </span>
          </div>
        </div>
      </div>
      <img
        src="../assets/web/merch/maxresdefault 1.svg"
        className="section--merch__banner img-fluid relative"
      />
      <div className="section--merch__form relative">
        <div className="row">
          <div className="col-12">
            <img
              src="../assets/web/merch/TobiasProfile.svg"
              className="section--merch__form__image"
            />
          </div>
          <div className="col-xl-8 col-lg-6"></div>
          <div className="col-xl-4 col-lg-6 p-0 m-0">
            <div className="section--merch__category__box">FEATURED PRODUCT</div>
          </div>
          <div className="col-12 py-2">
            <p className="section--merch__form__title">
              FujiFilm X-T4 / FX3 Color Correction LUTs
            </p>
          </div>
          <div className="col-12 py-2">
            <p className="section--merch__form__description">
              A pack of 3 carefully designed LUTS for FUJI FILM Cameras when
              shooting F-Log. These LUTS have been created by applying a rec 709
              correction and then manually creatively grading to achieve the final
              look you see.
            </p>
          </div>
          <div className="col-12 pb-2 pt-3 section--merch__fields">
            <input
              className="
              appearance-none
              border
              rounded
              w-full
              py-2
              px-3
              text-gray-700
              leading-tight
            "
              type="text"
              placeholder="000-00-0000"
            />
          </div>
          <div className="col-12 pb-2">
            <input
              className="
              appearance-none
              border
              rounded
              w-full
              py-2
              px-3
              text-gray-700
              leading-tight
            "
              type="text"
              placeholder="Name on card"
            />
          </div>
          <div className="col-12 pb-2">
            <input
              className="
              appearance-none
              border
              rounded
              w-full
              py-2
              px-3
              text-gray-700
              leading-tight
            "
              type="text"
              placeholder="1234 1234 1234 1234"
            />
          </div>
          <div className="col-6 pb-2 pr-0 mr-0">
            <input
              className="
              appearance-none
              border
              rounded
              w-full
              py-2
              px-3
              text-gray-700
              leading-tight
            "
              type="text"
              placeholder="MM/YY"
            />
          </div>
          <div className="col-6 pl-0 ml-0">
            <input
              className="
              appearance-none
              border
              rounded
              w-full
              py-2
              px-3
              text-gray-700
              leading-tight
            "
              type="text"
              placeholder="CVC"
            />
          </div>
        </div>
        <p className="section--merch__form__description">
          You will be redirected to the product page after the checkout.
        </p>
        <div className="section--merch__form__pay__button">PAY ($13)</div>
      </div>
    </div>

  )
}
