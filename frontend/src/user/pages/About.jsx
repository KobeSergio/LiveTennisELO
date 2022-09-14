import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import bg_img from "../img/bg-liveratings.png";

import {
  YearDropdown,
  RowsDropdown,
  DateDropdown,
} from "../../components/Dropdown";
import AboutContent from "../components/Content/About";
import TennisRatingGuide from "../components/Tables/TennisRatingGuide";
import Footer from "../components/Footer/Footer";

export default function About() {
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
