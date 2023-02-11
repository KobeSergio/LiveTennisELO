import {
  BarChartFill,
  ClipboardData,
  Hammer,
  HouseFill,
  Question,
  QuestionCircleFill,
  Wallet,
} from "react-bootstrap-icons";
import base from "../../img/base.PNG";

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
            <p className="fw-normal ">
              Live Tennis ELO Ratings is your go-to place for men’s professional
              tennis statistics! Our goal is to feed the users with all kinds of
              tennis stats and ratings. Track your favorite player’s ratings
              with the help of our graphs and compare them to their rivals. All
              of these wonderful feature within a smooth and modern interface.
            </p>
          </section>
          <section className="mb-5">
            <div className="d-flex align-items-start">
              <div className="d-flex align-items-start mb-0">
                <QuestionCircleFill size={24} className="me-2 mt-1" />
                <h3>FAQs</h3>
              </div>
            </div>
            <h5 className="fw-bold mb-0">Why website is called tenelos?</h5>
            <p className="fw-normal ">
              On our website you will find Tennis ELO ratings. Just like
              official <b>ATP Rankings</b> we are updating our own unique{" "}
              <b>ELO </b>
              ratings on <b>Hard</b>, <b>Clay</b> and <b>Grass</b> surfaces
              influenced by similar Chess ratings developed by professor Arap
              Elo.
            </p>
            <h5 className="fw-bold mb-0">Records</h5>
            <p className="fw-normal  ">
              Currently you will find official tournaments results starting from
              1976, although our database starting from 1968 (Open Era). We are
              currently working on dynamics to upload all ELO files since 1968.
              You can check weekly rankings on all surfaces. Our Homepage has
              our live ELO rankings on all surfaces and Official{" "}
              <b>ATP Rankings.</b>
            </p>
            <h5 className="fw-bold mb-0">Charts</h5>
            <p className="fw-normal ">
              In Charts you can compare 2 players ELO performances Overall (all
              surfaces) and also their ELO performances on different surfaces.
              You can also compare players rank and ratings even by age.
            </p>
            <h5 className="fw-bold mb-0">Last 10 Hot Performances </h5>
            <p className="fw-normal  ">
              Last 10 Hot Performances will show Players with best ELO
              performance in their last 10 matches played.
            </p>
            <h5 className="fw-bold mb-0">Top 15’s All-Time</h5>
            <p className="fw-normal ">
              Top 15’s All-Time has players Overall (all matches) peak
              performance and best ELO on 3 surfaces (Hard, Clay & Grass) and
              official peak ATP points stand. We also added Average column –
              showing average peak performance of all surfaces since players
              usually don’t play equal numbers of matches on each surface.
            </p>
            <h5 className="fw-bold mb-0">Players</h5>
            <p className="fw-normal ">
              To be included in our database players have to win with rated
              opponent in official ATP tournament. Reaching second round of ATP
              (250) tournament usually awards 2450 ELO. Winning ATP (250)
              tournament awards minimum 2625 ELO (In Chess = Grandmaster’s
              norm). We use modified version of ELO system where winner gains
              from 0 up to 8 ELO points (loser 0 to -8 points) based on rankings
              differences. Additional 1 ELO point bonus is added if players win
              2:0 or 3:1 in sets and finally 2 ELO points added if player wins
              3:0 in sets. As bases we used minimum ELO requirements for
              different tournaments:
            </p>
            <img src={base} />
            <p className="fw-normal mb-0 mt-2">
              In player profile, you will find ATP and our ELO charts as well as
              players results, last 10 matches performance, videos of matches
              highlights (if available), Wikipedia and often their social media.
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
            <p className="fw-normal  ">
              A player’s ranking is determined by their performance in Grand
              Slams, ATP Tour and Challenger Tournaments, 25K ITF tournaments,
              and 15K ITF Tournaments. The player’s ranking is based on their
              best 16 results during a calendar year. The points for a
              tournament will count towards a player’s ranking for a total of 52
              weeks following the result.
            </p>
            <h5 className="fw-bold mb-0">ELO Ranking:</h5>
            <p className="fw-normal">
              The principle behind any Elo system is that each player’s rating
              is an estimate of their strength, and each match (or tournament)
              allows us to update that estimate. If a player wins, his rating
              goes up; if he loses, it goes down. Where Elo excels is in
              determining the amount by which a rating should increase or
              decrease. There are two main variables that are taken into
              account: How many matches are already in the system (that is, how
              much confidence we have in the pre-match rating), and the quality
              of the opponent.
            </p>
          </section>
          <section className="mb-5">
            <h5 className="fw-bold mb-0">Contact us:</h5>
            <p className="fw-normal ">
              For inquiries, bugs, comments, or just to say hello, feel free to
              reach out to us at{" "}
              <a
                href="mailto:tennis.elos@gmail.com?subject=Mail from our Website"
                className="text-blue-600 visited:text-purple-600 "
                style={{ textDecoration: "underline", fontWeight: "bold" }}
              >
                tennis.elos@gmail.com
              </a>
              , we'd love to hear from you!
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
