import { Facebook, Twitter, Instagram, Globe } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import H2H from "../../pages/H2H";

function parseCountry(country_id) {
  let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  return regionNames.of(country_id); // "United States
}

function parseDate(dateString) {
  var mydate = new Date();
  if (!dateString.includes("-") && !dateString.includes("/")) {
    mydate = new Date(
      dateString.substring(0, 4),
      dateString.substring(4, 6),
      dateString.substring(6, 8)
    );
    var dateStr = mydate.toDateString();
    return dateStr.substr(dateStr.indexOf(" ") + 1);
  } else {
    if (dateString.includes("-")) {
      var newdate = "";
      if (dateString.length > 10) {
        newdate = dateString.split(" ")[0].split("-");
      } else {
        newdate = dateString.split("-");
      }
      mydate = new Date(
        newdate[0], //Year
        newdate[1], //Month
        newdate[2] // Day
      );
      var dateStr = mydate.toDateString();
      return dateStr.substr(dateStr.indexOf(" ") + 1);
    } else {
      var newdate = "";
      if (dateString.length > 10) {
        newdate = dateString.split(" ")[0].split("/");
      } else {
        newdate = dateString.split("/");
      }
      mydate = new Date(
        newdate[2], //Year
        newdate[0], //Month
        newdate[1] // Day
      );
      var dateStr = mydate.toDateString();
      return dateStr.substr(dateStr.indexOf(" ") + 1);
    }
  }
}

function parsebirthDate(dateString) {
  var birthdate = new Date(
    dateString.substring(0, 4),
    dateString.substring(4, 6),
    dateString.substring(6, 8)
  );
  var dateToday = new Date();
  var diff = birthdate.getFullYear() - dateToday.getFullYear();
  return Math.abs(diff);
}

function computeStatus(dateString) {
  var mydate = new Date();

  if (!dateString.includes("-") && !dateString.includes("/")) {
    mydate = new Date(
      dateString.substring(0, 4),
      dateString.substring(4, 6),
      dateString.substring(6, 8)
    );
  } else {
    if (dateString.includes("-")) {
      var newdate = dateString.split(" ")[0].split("-");
      mydate = new Date(
        newdate[0], //Year
        newdate[1], //Month
        newdate[2] // Day
      );
    } else {
      var newdate = dateString.split(" ")[0].split("/");
      mydate = new Date(
        newdate[2], //Year
        newdate[0], //Month
        newdate[1] // Day
      );
    }
  }

  var dateToday = new Date();
  var diff = dateToday.getFullYear() - mydate.getFullYear();
  return Math.abs(diff) >= 1 && Math.abs(diff) <= 2
    ? "Inactive"
    : Math.abs(diff) < 1
    ? "Active"
    : "Retired";
}

function getPerformance(data, player_id) {
  var uncounted = 0;
  var wins = { overall: 0, hard: 0, clay: 0, grass: 0 };
  data.forEach((match) => {
    if (match.score != "W/O") {
      //Add win or lose
      if (match.winner_local_id == player_id) {
        wins.overall++;
        switch (match.surface.toLowerCase()) {
          case "hard":
            wins.hard++;
            break;
          case "clay":
            wins.clay++;
            break;
          case "grass":
            wins.grass++;
            break;
          default:
            break;
        }
      }
    } else {
      uncounted++;
    }
  });
  return wins;
}

export default function PlayerInfo({ player, h2h }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="rounded-3 bg-white">
        <div className="container-fluid rounded-3 shadow p-2 px-4 mb-2">
          <div className="row py-3">
            <div className="col-sm-12 col-lg-3">
              <div class="d-flex justify-content-center">
                <img
                  className="player_pfpic bg-transparent border-0 img-responsive img-thumbnail"
                  id="player-pfpic"
                  src={
                    player.img_link == null
                      ? `https://i.ibb.co/dBb6xnR/no-player.png`
                      : player.img_link
                  }
                  style={{ width: 300, height: 200, objectFit: "cover" }}
                />
              </div>
              <div class="d-flex justify-content-center align-items-center">
                <h1 className="fs-5 fw-bold" id="player-name">
                  <a
                    href="#/"
                    onClick={() => navigate("/players/" + player.player_id)}
                  >
                    {player.player_name}
                  </a>
                </h1>
              </div>
              <div class="d-flex justify-content-center">
                <div className="text-dark" id="social">
                  {player.facebook == null ? (
                    <></>
                  ) : (
                    <a target="_blank" className="me-2" href={player.facebook}>
                      <Facebook />
                    </a>
                  )}
                  {player.twitter == null ? (
                    <></>
                  ) : (
                    <a target="_blank" className="me-2" href={player.twitter}>
                      <Twitter />
                    </a>
                  )}
                  {player.instagram == null ? (
                    <></>
                  ) : (
                    <a target="_blank" className="me-2" href={player.instagram}>
                      <Instagram />
                    </a>
                  )}
                  {player.wiki == null ? (
                    <></>
                  ) : (
                    <a target="_blank" className="me-2" href={player.wiki}>
                      <Globe />
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-lg-9">
              <div className="row mb-4">
                <div className="col-sm-12">
                  <div className="row">
                    <h1 className="fs-5 fw-bold pb-2">Player Information:</h1>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      {/* age, country, bithplace, height weight, socials */}
                      {player.birthdate == null ? <></> : <div>Age:</div>}
                      <div>Country:</div>
                      {player.birthplace == null ? (
                        <></>
                      ) : (
                        <div>Birthplace:</div>
                      )}
                      {player.height == null ? <></> : <div>Height:</div>}
                      {player.weight == null ? <></> : <div>Weight:</div>}
                      {player.hand == null ? <></> : <div>Plays:</div>}
                      {player.backhand == null ? <></> : <div>Backhand:</div>}
                      {player.favorite_surface == null ? (
                        <></>
                      ) : (
                        <div>Favorite Surface:</div>
                      )}
                      {player.website == null ? <></> : <div>Website:</div>}
                      {player.nicknames == null ? <></> : <div>Nicknames:</div>}
                      {player.last_match == null ? (
                        <></>
                      ) : (
                        <div>Last Active:</div>
                      )}
                      {player.last_match == null ? <></> : <div>Status:</div>}
                    </div>
                    <div className="col">
                      {" "}
                      {/* age, country, bithplace, height weight, socials */}
                      <div className="text-dark" id="age">
                        {player.birthdate == null ? (
                          <></>
                        ) : (
                          parsebirthDate(player.birthdate) +
                          " " +
                          "(" +
                          parseDate(player.birthdate) +
                          ")"
                        )}
                      </div>
                      <div className="text-dark" id="country">
                        {player.player_id.substring(0, 2) === "UN"
                          ? "Unknown "
                          : parseCountry(player.player_id.substring(0, 2))}
                      </div>
                      <div className="text-dark" id="birthplace">
                        {player.birthplace == null ? <></> : player.birthplace}
                      </div>
                      <div className="text-dark">
                        <span className="text-dark" id="height">
                          {player.height == null ? (
                            <></>
                          ) : (
                            player.height + " cm"
                          )}
                        </span>
                      </div>
                      <div className="text-dark">
                        <span className="text-dark" id="weight">
                          {player.weight == null ? (
                            <></>
                          ) : (
                            player.weight + " kg"
                          )}
                        </span>
                      </div>
                      <div className="text-dark" id="plays">
                        {player.hand == "L"
                          ? "Left-handed"
                          : player.hand == "R"
                          ? "Right-handed"
                          : "Unknown"}
                      </div>
                      <div className="text-dark" id="backhand">
                        {player.backhand == null ? <></> : player.backhand}
                      </div>
                      <div className="text-dark gc-100" id="surface">
                        {player.favorite_surface == null ? (
                          <></>
                        ) : (
                          player.favorite_surface
                        )}
                      </div>
                      <div className="text-dark" id="website">
                        {player.website == null ? <></> : player.website}
                      </div>
                      <div className="text-dark" id="nicknames">
                        {player.nicknames == null ? <></> : player.nicknames}
                      </div>
                      <div className="text-dark">
                        {player.last_match == null ? (
                          <></>
                        ) : (
                          parseDate(player.last_match)
                        )}
                      </div>
                      <div className="text-dark">
                        {player.last_match == null ? (
                          <></>
                        ) : computeStatus(player.last_match) === "Retired" ? (
                          <>
                            <span
                              style={{ backgroundColor: "#000000" }}
                              className="table-surface-elo-label"
                            >
                              {computeStatus(player.last_match)}
                            </span>
                          </>
                        ) : computeStatus(player.last_match) === "Inactive" ? (
                          <>
                            <span
                              style={{ backgroundColor: "#808080" }}
                              className="table-surface-elo-label"
                            >
                              {computeStatus(player.last_match)}
                            </span>
                          </>
                        ) : (
                          <>
                            <span
                              style={{ backgroundColor: "#22BC22" }}
                              className="table-surface-elo-label"
                            >
                              {computeStatus(player.last_match)}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12">
                  <h1 className="fs-5 fw-bold pt-3">H2H Wins:</h1>
                  <div className="row mb-3">
                    <div className="col-sm-6 col-6">
                      <div>Overall Wins:</div>
                    </div>
                    <div className="col-sm-6 col-6">
                      <div id="overall">
                        <span
                          style={{ backgroundColor: "#000000" }}
                          className="table-surface-elo-label"
                        >
                          {getPerformance(h2h, player.player_id).overall}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6 col-6">
                      <div className="hard-text">Hard Wins:</div>
                    </div>
                    <div className="col-sm-6 col-6">
                      <div className="hard-text" id="hard">
                        <span
                          style={{ backgroundColor: "#015778" }}
                          className="table-surface-elo-label"
                        >
                          {getPerformance(h2h, player.player_id).hard}
                        </span>
                      </div>
                    </div>
                    {/* clay rank */}
                    <div className="col-sm-6 col-6">
                      <div className="clay-text">Clay Wins:</div>
                    </div>
                    <div className="col-sm-6 col-6">
                      <div className="clay-text" id="clay">
                        <span
                          style={{ backgroundColor: "#E96513" }}
                          className="table-surface-elo-label"
                        >
                          {getPerformance(h2h, player.player_id).clay}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-6 col-6">
                      <div className="grass-text">Grass Wins:</div>
                    </div>
                    <div className="col">
                      <div className="grass-text" id="grass">
                        <span
                          style={{ backgroundColor: "#3EBA7C" }}
                          className="table-surface-elo-label"
                        >
                          {getPerformance(h2h, player.player_id).grass}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
