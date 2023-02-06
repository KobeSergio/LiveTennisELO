import bg_img from "../img/bg-liveratings.png";
import AboutContent from "../components/Content/About";
import TennisRatingGuide from "../components/Tables/TennisRatingGuide";
import Footer from "../components/Footer/Footer";
import ReactGA from "react-ga";
import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <>
      <div
        className="liverating-bg"
        style={{ backgroundImage: `url(${bg_img})` }}
      >
        <div className="px-5 py-4">
          <div className="row">
            <div className="col-lg-9 col-sm-12 col-12">
              <AboutContent />
            </div>
            <div className="col-lg-3 col-sm-12 col-12">
              <TennisRatingGuide />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
