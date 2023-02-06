import bg_img from "../img/bg-liveratings.png";
import LiveRatingsTable from "../components/Tables/LiveRatingsTable";
import SideTables from "../components/Tables/SideTables";
import Footer from "../components/Footer/Footer";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import LatestTournament from "../components/Tables/LatestTournament";
import ReactGA from "react-ga4";
import { useEffect } from "react";

export default function Charts() {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  return (
    <>
      <div
        className="liverating-bg"
        style={{ backgroundImage: `url(${bg_img})` }}
      >
        <div className="px-3 py-4">
          <div className="p-2 col-6-lg ">
            <h1 className="fs-3">
              <b>Welcome to TenELOs - Live Tennis ELO Ratings!</b>
            </h1>
            <p>
              Your go-to place for men's professional tennis statistics! Track
              your favorite player's ratings with the help of graphs and compare
              them to their rivals.
            </p>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <LiveRatingsTable />
              <div className="mt-4">
                <h3>
                  <b>Latest Tournaments:</b>
                </h3>
                <LatestTournament />
              </div>
              <div className="mt-4">
                <h3>
                  <b>News:</b>
                </h3>
                <TwitterTimelineEmbed
                  sourceType="profile"
                  screenName="tennis"
                  options={{ height: 400 }}
                />
              </div>
            </div>
            <div className="col-lg-4 h-100">
              <SideTables />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
