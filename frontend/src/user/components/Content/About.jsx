import {
  BarChartFill,
  ClipboardData,
  Hammer,
  HouseFill,
  Wallet,
} from "react-bootstrap-icons";
import ATPAllocation from "../Redirect/ATPAllocation";

export default function () {
  return (
    <>
      <div className="row mb-3">
        <div className="col-lg-12 bg-white shadow rounded-4 p-4">
          <section className="mb-5">
            <div className="d-flex align-items-start">
              <div className="d-flex align-items-start">
                <HouseFill size={24} className="me-2 mt-1" />
                <h3>Introduction:</h3>
              </div>
            </div>
            <p className="fw-normal">
              Live Tennis ELO Ratings is your go-to place for men’s professional
              tennis statistics! Our goal is to feed the users with all kinds of
              tennis stats and ratings. Track your favorite player’s ratings
              with the help of our graphs and compare them to their rivals. All
              of these wonderful feature within a smooth and modern interface.
            </p>
          </section>

          <section className="mb-5">
            <div className="d-flex align-items-start">
              <div className="d-flex align-items-start">
                <ClipboardData size={24} className="me-2 mt-1" />
                <h3>Data:</h3>
              </div>
            </div>
            <h5 className="fw-bold mb-0">Data Source</h5>
            <p className="fw-normal mb-4">
              The statistical data shown on our site are based from the personal
              data records of Tomasz Kosinski which dates all the ELO ratings of
              tennis players with a minimum of 2400 ELO rating. Tomasz’ records
              dates way back 1968. We opted to use the minimum of 2400 ELO
              rating of tennis players based on Chess ELO ratings
              <br />
              <br />
              Some statistical data such as the ATP points of each player are
              not included in Tomasz’ records hence we opted to extract player’s
              points on Jeff Sackmann’s open-source tennis data repository.
            </p>

            <h5 className="fw-bold mb-0">Data Update</h5>
            <p className="fw-normal">
              Live Tennis ELO Ratings is fed with data updated every week with
              player’s new rankings.
            </p>
          </section>

          <section className="mb-5">
            <div className="d-flex align-items-start">
              <div className="d-flex align-items-start">
                <BarChartFill size={24} className="me-2 mt-1" />
                <h3>Tennis ELO Rating:</h3>
              </div>
            </div>
            <h5 className="fw-bold mb-0">ATP Ranking:</h5>
            <p className="fw-normal mb-0">
              A player’s ranking is determined by their performance in Grand
              Slams, ATP Tour and Challenger Tournaments, 25K ITF tournaments,
              and 15K ITF Tournaments. The player’s ranking is based on their
              best 16 results during a calendar year. The points for a
              tournament will count towards a player’s ranking for a total of 52
              weeks following the result.
            </p>

            <div className="p-3">
              {/* <ATPAllocation /> */}
            </div>

            <h5 className="fw-bold mb-0">ELO Ranking:</h5>
            <p className="fw-normal">
              The principle behind any Elo system is that each player’s rating
              is an estimate of their strength, and each match (or tournament)
              allows us to update that estimate. If a player wins, his rating
              goes up; if he loses, it goes down.
              <br />
              <br />
              Where Elo excels is in determining the amount by which a rating
              should increase or decrease. There are two main variables that are
              taken into account: How many matches are already in the system
              (that is, how much confidence we have in the pre-match rating),
              and the quality of the opponent.
            </p>
          </section>

          <section className="mb-5">
            <div className="d-flex align-items-start">
              <div className="d-flex align-items-start mb-0">
                <Hammer size={24} className="me-2 mt-1" />
                <h3>Build</h3>
              </div>
            </div>
            <p className="fw-normal mb-0">
              If there are any concerns and feedback about the website, you may
              reach out to us at ckasergio@gmail.com
            </p>
          </section>

          <section className="mb-5">
            <div className="d-flex align-items-start">
              <div className="d-flex align-items-start mb-0">
                <Wallet size={24} className="me-2 mt-1" />
                <h3>Donations</h3>
              </div>
            </div>
            <p className="fw-normal mb-0">
              If you enjoy the Live Tennis ELO Ratings website and would like to
              help it, please think about making a small donation to support our
              project. Thanks!
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
