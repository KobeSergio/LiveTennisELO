import {
  BoxArrowUpRight,
  Paypal,
  CreditCard,
  CreditCard2Front,
} from "react-bootstrap-icons";
import ATPAllocation from "../Redirect/ATPAllocation";
export default function () {
  return (
    <>
      <h2 className="fs-4">Tennis rating guide:</h2>

      <div className="p-2">
        <div className="card rounded-3">
          <div className="card-body">
            <h5 className="card-title">ATP Ranking:</h5>
            <span className="card-text">
              A player’s ranking is determined by their performance in Grand
              Slams, ATP Tour and Challenger Tournaments, 25K ITF tournaments,
              and 15K ITF Tournaments. The player’s ranking is based on their
              best 16 results during a calendar year. The points for a
              tournament will count towards a player’s ranking for a total of 52
              weeks following the result.
            </span>
            <br />
            <br />
            {/* <ATPAllocation /> */}
            <h5 className="card-title">ELO Ranking:</h5>
            <span className="card-text">
              The principle behind any Elo system is that each player’s rating
              is an estimate of their strength, and each match (or tournament)
              allows us to update that estimate. If a player wins, her rating
              goes up; if she loses, it goes down. Where Elo excels is in
              determining the amount by which a rating should increase or
              decrease. There are two main variables that are taken into
              account: How many matches are already in the system (that is, how
              much confidence we have in the pre-match rating), and the quality
              of the opponent.
            </span>
            <br />
            <br />
            <h5 className="card-title">Player Matches:</h5>
            <span className="card-text">
              Starting from 2022 US OPEN, all ELO Ratings will be calculated
              based on the player's current ELO before the match.
            </span>
            <br />
            <br />
            <h5 className="card-title">Searching:</h5>
            <span className="card-text">
              For searching by country, please indicate the country code only.
              {"\xa0\xa0"}
              Ex: United states = US.
              <br />
              You may refer for the country codes here:{" "}
              <a
                target="_blank"
                href="https://www.worlddata.info/countrycodes.php"
              >
                Country Codes
              </a>
            </span>
          </div>
        </div>
      </div>
      {/* <div className="text-center px-2 py-2">
            <CreditCard size={30} className="me-2" />{" "}
            <Paypal className="me-2" size={30} /> <CreditCard2Front size={30} />
          </div>
          <span className="">
            If you enjoy the Live Tennis ELO Ratings website and would like to
            help it, please think about making a small donation to support our
            project. Thanks!
          </span> */}
    </>
  );
}
