import About from "~/components/About";
import Benefits from "~/components/Benefits";
import BoostConversion from "~/components/Boost-Conversion";
import CombineBlock from "~/components/Combine-Block";
import DiscoverSource from "~/components/Discover-Source";
import FindLayout from "~/components/Find-Layout";
import Merch from "~/components/Merch";
import Newsletter from "~/components/Newsletter";
import ShortTermStaff from "~/components/Short-Term-Staff";
import SlideShow from "~/components/Slide-Show";
import Statistics from "~/components/Statistics";
import Subscription from "~/components/Subscription";
import SuitableBlock from "~/components/Suitable-Block";


export default function TestPage() {

  return (<div id="app">
    <section>
      <div className="container-fluid section--about">
        <About />
      </div>
      <div className="container-fluid">
        <div className="row py-5 justify-content-center">
          <div className="col-lg-5 d-xl-block d-lg-block d-none">
            <div className="section--merch"><Merch /></div>
            <SlideShow />
          </div>
          <div className="col-lg-5 col-md-12">
            <Benefits />
            <ShortTermStaff />
            <Newsletter />
            <Subscription />
            <BoostConversion />
            <Statistics />
            <SuitableBlock />
            <CombineBlock />
            <FindLayout />
            <DiscoverSource />
          </div>
        </div>
      </div>
    </section>
  </div>)
}
