

export default function About() {
  return (<div className="row justify-content-center">
    <div className="col-lg-5 col-md-12 py-4 section--about__banner">
      {/* <img
        src="../assets/web/about/TobiasBanner.svg"
        className="section--about__image img-fluid d-none d-md-block"
      />
      <img
        src="../assets/mobile/about/Tobias.svg"
        className="section--about__image img-fluid d-sm-block d-md-none"
      /> */}
      <div className="section--about__image__caption">
        <span>Verified Creator</span>
        <span>New York, US</span>
      </div>
    </div>
    <div className="col-lg-5 col-md-12 section--about__text">
      <div className="section--about__title">Tobias van Schneider</div>
      <div className="section--about__subtitle py-2">
        @tobias <span className="px-2">•</span> Creative Generalist
      </div>
      <p className="section--about__description py-3">
        Tobias van Schneider is a German multi-disciplinary maker of useful,
        curious and beautiful things (he just doesn't like the word
        entrepreneur). Born in Germany and raised in Austria, he now lives and
        works in New York City.
      </p>
      <div className="section--about__socialmedia py-3">
        <div className="mr-3">
          {/* <img src="../assets/web/about/VectorTwitter.svg" className="img-fluid" /> */}
        </div>
        <div className="mr-3">
          {/* <img
            src="../assets/web/about/VectorInstagram.svg"
            className="img-fluid"
          /> */}
        </div>
        {/* <!-- <div className="mr-3">
          <img src="../assets/web/about/VectorYoutube.svg" className="img-fluid" />
        </div> --> */}
        <div className="mr-3">
          {/* <img src="../assets/web/about/VectorLinkedin.svg" className="img-fluid" /> */}
        </div>
        <div className="mr-3">
          {/* <img src="../assets/web/about/VectorTiktok.svg" className="img-fluid" /> */}
        </div>
        ~ 23K followers
      </div>
    </div>
  </div>)
}
