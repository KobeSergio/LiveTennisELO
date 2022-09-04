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
          <div className="p-2 w-50">
            <h1 className="fs-3">About this site:</h1>
          </div>
          <div className="row">
            <AboutContent />
            <div className="w-25">
              <TennisRatingGuide />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
