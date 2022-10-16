import { PlayerChart } from "../components/Charts/PlayerChart";
import { PlayerMatches } from "../components/Tables/PlayerMatches";
import ClipLoader from "react-spinners/ClipLoader";
import { Facebook, Twitter, Instagram, Globe } from "react-bootstrap-icons";

//Backend
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  loadPlayer,
  loadPlayerList,
  resetPlayer,
} from "../../features/api/apiSlice";

function toTitleCase(str) {
  if (str.toLowerCase() === "mcenroe john") {
    return "McEnroe John";
  }
  if (str.toLowerCase() === "mcenroe patrick") {
    return "McEnroe Patrick";
  }
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function parseCountry(country_id) {
  let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  return regionNames.of(country_id); // "United States
}

function parseDate(dateString) {
  if (dateString == null) {
    return "";
  }
  var mydate = new Date();
  if (!dateString.includes("-") && !dateString.includes("/")) {
    mydate = new Date(
      dateString.substring(0, 4),
      dateString.substring(4, 6) - 1,
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
        newdate[1] - 1, //Month
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
        newdate[0] - 1, //Month
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
    dateString.substring(4, 6) - 1,
    dateString.substring(6, 8)
  );
  var dateToday = new Date();
  var diff = birthdate.getFullYear() - dateToday.getFullYear();
  return Math.abs(diff);
}

function computeStatus(dateString) {
  if (dateString == null) {
    return null;
  }
  var mydate = new Date();
  if (!dateString.includes("-") && !dateString.includes("/")) {
    mydate = new Date(
      dateString.substring(0, 4),
      dateString.substring(4, 6) - 1,
      dateString.substring(6, 8)
    );
  } else {
    if (dateString.includes("-")) {
      var newdate = dateString.split(" ")[0].split("-");
      mydate = new Date(
        newdate[0], //Year
        newdate[1] - 1, //Month
        newdate[2] // Day
      );
    } else {
      var newdate = dateString.split(" ")[0].split("/");
      mydate = new Date(
        newdate[2], //Year
        newdate[0] - 1, //Month
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

export default function Player() {
  const {
    player_details,
    player_matches,
    player_isLoading,
    player_records,
    players,
  } = useSelector((state) => state.api);
  const { player_id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (players.length === 0) {
      dispatch(loadPlayerList());
    }
    dispatch(resetPlayer());
    dispatch(loadPlayer(player_id));
  }, []);

  useEffect(() => {
    if (players.length === 0) {
      dispatch(loadPlayerList());
    }
    dispatch(resetPlayer());
    dispatch(loadPlayer(player_id));
  }, [navigate]);

  const dispatch = useDispatch();

  const override = {
    margin: 0,
    position: "absolute",
    top: "45%",
    left: "45%",
    transform: "translate(-45%, -45%)",
  };

  if (player_details == 0 || player_isLoading) {
    return <ClipLoader cssOverride={override} size={70} />;
  }
  return (
    <>
      <div className="p-3">
        <div className="rounded-3 bg-white">
          <div className="container-fluid h-100 rounded-3 shadow p-2 px-4 mb-2">
            <div className="row py-3">
              <div className="col-lg-2 col-sm-12 ">
                <div class="d-flex justify-content-center">
                  <img
                    className="player_pfpic bg-transparent border-0 img-responsive img-thumbnail"
                    id="player-pfpic"
                    src={
                      player_details[0].img_link == null
                        ? `https://i.ibb.co/dBb6xnR/no-player.png`
                        : player_details[0].img_link
                    } 
                    style={{
                      width: 200,
                      height: 300,
                      objectFit: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </div>
                <div class="d-flex justify-content-center">
                  <h1 className="fs-3 fw-bold" id="player-name">
                    {toTitleCase(player_details[0].player_name)}
                  </h1>
                </div>
                <div class="d-flex justify-content-center">
                  <div className="text-dark" id="social">
                    {player_details[0].facebook == null ? (
                      <></>
                    ) : (
                      <a
                        target="_blank"
                        className="me-2"
                        href={player_details[0].facebook}
                      >
                        <Facebook />
                      </a>
                    )}
                    {player_details[0].twitter == null ? (
                      <></>
                    ) : (
                      <a
                        target="_blank"
                        className="me-2"
                        href={player_details[0].twitter}
                      >
                        <Twitter />
                      </a>
                    )}
                    {player_details[0].instagram == null ? (
                      <></>
                    ) : (
                      <a
                        target="_blank"
                        className="me-2"
                        href={player_details[0].instagram}
                      >
                        <Instagram />
                      </a>
                    )}
                    {player_details[0].wiki == null ? (
                      <></>
                    ) : (
                      <a
                        target="_blank"
                        className="me-2"
                        href={player_details[0].wiki}
                      >
                        <Globe />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div class="col-lg-10 col-sm-12">
                <div className="row mb-4">
                  <div className="col-lg-3 col-sm-12">
                    <div className="row">
                      <h1 className="fs-5 fw-bold pb-2">Player Information</h1>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        {/* age, country, bithplace, height weight, socials */}
                        {player_details[0].birthdate == null ? (
                          <></>
                        ) : (
                          <div>Age:</div>
                        )}
                        <div>Country:</div>
                        {player_details[0].birthplace == null ? (
                          <></>
                        ) : (
                          <div>Birthplace:</div>
                        )}
                        {player_details[0].height == null ? (
                          <></>
                        ) : (
                          <div>Height:</div>
                        )}
                        {player_details[0].weight == null ? (
                          <></>
                        ) : (
                          <div>Weight:</div>
                        )}
                        {player_details[0].hand == null ? (
                          <></>
                        ) : (
                          <div>Plays:</div>
                        )}
                        {player_details[0].backhand == null ? (
                          <></>
                        ) : (
                          <div>Backhand:</div>
                        )}
                        {player_details[0].favorite_surface == null ? (
                          <></>
                        ) : (
                          <div>Favorite Surface:</div>
                        )}
                        {player_details[0].website == null ? (
                          <></>
                        ) : (
                          <div>Website:</div>
                        )}
                        {player_details[0].nicknames == null ? (
                          <></>
                        ) : (
                          <div>Nicknames:</div>
                        )}
                        {player_details[0].last_match == null ? (
                          <></>
                        ) : (
                          <div>Last Active:</div>
                        )}
                        {player_details[0].last_match == null ? (
                          <></>
                        ) : (
                          <div>Status:</div>
                        )}
                      </div>
                      <div className="col">
                        {" "}
                        {/* age, country, bithplace, height weight, socials */}
                        <div className="text-dark" id="age">
                          {player_details[0].birthdate == null ? (
                            <></>
                          ) : (
                            parsebirthDate(player_details[0].birthdate) +
                            " " +
                            "(" +
                            parseDate(player_details[0].birthdate) +
                            ")"
                          )}
                        </div>
                        <div className="text-dark" id="country">
                          {player_details[0].player_id.substring(0, 2) === "UN"
                            ? "Unknown "
                            : parseCountry(
                                player_details[0].player_id.substring(0, 2)
                              )}
                        </div>
                        <div className="text-dark" id="birthplace">
                          {player_details[0].birthplace == null ? (
                            <></>
                          ) : (
                            player_details[0].birthplace
                          )}
                        </div>
                        <div className="text-dark">
                          <span className="text-dark" id="height">
                            {player_details[0].height == null ? (
                              <></>
                            ) : (
                              player_details[0].height + " cm"
                            )}
                          </span>
                        </div>
                        <div className="text-dark">
                          <span className="text-dark" id="weight">
                            {player_details[0].weight == null ? (
                              <></>
                            ) : (
                              player_details[0].weight + " kg"
                            )}
                          </span>
                        </div>
                        <div className="text-dark" id="plays">
                          {player_details[0].hand == "L"
                            ? "Left-handed"
                            : player_details[0].hand == "R"
                            ? "Right-handed"
                            : "Unknown"}
                        </div>
                        <div className="text-dark" id="backhand">
                          {player_details[0].backhand == null ? (
                            <></>
                          ) : (
                            player_details[0].backhand
                          )}
                        </div>
                        <div className="text-dark gc-100" id="surface">
                          {player_details[0].favorite_surface == null ? (
                            <></>
                          ) : (
                            player_details[0].favorite_surface
                          )}
                        </div>
                        <div className="text-dark" id="website">
                          {player_details[0].website == null ? (
                            <></>
                          ) : (
                            player_details[0].website
                          )}
                        </div>
                        <div className="text-dark" id="nicknames">
                          {player_details[0].nicknames == null ? (
                            <></>
                          ) : (
                            player_details[0].nicknames
                          )}
                        </div>
                        <div className="text-dark">
                          {player_details[0].last_match == null ? (
                            <></>
                          ) : (
                            parseDate(player_details[0].last_match)
                          )}
                        </div>
                        <div className="text-dark">
                          {player_details[0].last_match == null ? (
                            <></>
                          ) : computeStatus(player_details[0].last_match) ===
                            "Retired" ? (
                            <>
                              <span
                                style={{ backgroundColor: "#000000" }}
                                className="table-surface-elo-label"
                              >
                                {computeStatus(player_details[0].last_match)}
                              </span>
                            </>
                          ) : computeStatus(player_details[0].last_match) ===
                            "Inactive" ? (
                            <>
                              <span
                                style={{ backgroundColor: "#808080" }}
                                className="table-surface-elo-label"
                              >
                                {computeStatus(player_details[0].last_match)}
                              </span>
                            </>
                          ) : (
                            <>
                              <span
                                style={{ backgroundColor: "#22BC22" }}
                                className="table-surface-elo-label"
                              >
                                {computeStatus(player_details[0].last_match)}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-9 col-sm-12">
                    <h1 className="fs-5 fw-bold pb-2">ELO Rankings</h1>
                    <div className="row mb-3">
                      <div className="col-lg-3 col-sm-6 col-6">
                        {player_details[0].overall_rank == null ? (
                          <></>
                        ) : (
                          <div>Overall Rank:</div>
                        )}

                        {player_details[0].overall_peak_rank == null ? (
                          <></>
                        ) : (
                          <div>Peak Overall Rank:</div>
                        )}

                        {player_details[0].overall_peak_rating == null ? (
                          <></>
                        ) : (
                          <div>Peak Overall Rating:</div>
                        )}
                      </div>
                      <div className="col-lg-3 col-sm-6 col-6">
                        <div id="overall">
                          {" "}
                          {player_details[0].overall_rank == null ? (
                            <></>
                          ) : (
                            <>
                              {player_details[0].last_match == null ? (
                                <></>
                              ) : computeStatus(
                                  player_details[0].last_match
                                ) === "Retired" ? (
                                <>{"\xa0"}</>
                              ) : (
                                <>
                                  <span
                                    style={{ backgroundColor: "#000000" }}
                                    className="table-surface-elo-label"
                                  >
                                    {player_details[0].overall_rank +
                                      " (" +
                                      player_details[0].overall_rating +
                                      ") "}
                                  </span>
                                </>
                              )}
                            </>
                          )}
                        </div>
                        <div id="peak_rank">
                          {player_details[0].overall_peak_rank == null ? (
                            <></>
                          ) : (
                            player_details[0].overall_peak_rank +
                            " (" +
                            parseDate(
                              player_details[0].overall_peak_rank_date
                            ) +
                            ") "
                          )}
                        </div>
                        <div id="peak_rating">
                          {player_details[0].overall_peak_rating == null ? (
                            <></>
                          ) : (
                            player_details[0].overall_peak_rating +
                            " (" +
                            parseDate(
                              player_details[0].overall_peak_rating_date
                            ) +
                            ") "
                          )}
                        </div>
                      </div>
                      {/* clay rank */}
                      <div className="col-lg-3 col-sm-6 col-6">
                        {player_details[0].clay_rank == null ? (
                          <></>
                        ) : (
                          <div className="clay-text">Clay Rank:</div>
                        )}

                        {player_details[0].clay_peak_rank == null ? (
                          <></>
                        ) : (
                          <div className="clay-text">Peak Clay Rank:</div>
                        )}

                        {player_details[0].clay_peak_rating == null ? (
                          <></>
                        ) : (
                          <div className="clay-text">Peak Clay Rating:</div>
                        )}
                      </div>
                      <div className="col-lg-3 col-sm-6 col-6">
                        <div className="clay-text" id="clay">
                          {player_details[0].clay_rank == null ? (
                            "\xa0"
                          ) : (
                            <>
                              {player_details[0].last_match == null ? (
                                <></>
                              ) : computeStatus(
                                  player_details[0].last_match
                                ) === "Retired" ? (
                                <>{"\xa0"}</>
                              ) : (
                                <>
                                  <span
                                    style={{ backgroundColor: "#E96513" }}
                                    className="table-surface-elo-label"
                                  >
                                    {player_details[0].clay_rank +
                                      " (" +
                                      player_details[0].clay_rating +
                                      ") "}
                                  </span>
                                </>
                              )}
                            </>
                          )}
                        </div>
                        <div className="clay-text" id="peak_rank">
                          {player_details[0].clay_peak_rank == null
                            ? "\xa0"
                            : player_details[0].clay_peak_rank +
                              " (" +
                              parseDate(player_details[0].clay_peak_rank_date) +
                              ") "}
                        </div>
                        <div className="clay-text" id="peak_rating">
                          {player_details[0].clay_peak_rating == null
                            ? "\xa0"
                            : player_details[0].clay_peak_rating +
                              " (" +
                              parseDate(
                                player_details[0].clay_peak_rating_date
                              ) +
                              ") "}
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-lg-3 col-sm-6 col-6">
                        {player_details[0].hard_rank == null ? (
                          <></>
                        ) : (
                          <div className="hard-text">Hard Rank:</div>
                        )}

                        {player_details[0].hard_peak_rank == null ? (
                          <></>
                        ) : (
                          <div className="hard-text">Peak Hard Rank:</div>
                        )}

                        {player_details[0].hard_peak_rating == null ? (
                          <></>
                        ) : (
                          <div className="hard-text">Peak Hard Rating:</div>
                        )}
                      </div>
                      <div className="col-lg-3 col-sm-6 col-6">
                        <div className="hard-text" id="hard">
                          {player_details[0].hard_rank == null ? (
                            "\xa0"
                          ) : (
                            <>
                              {player_details[0].last_match == null ? (
                                <></>
                              ) : computeStatus(
                                  player_details[0].last_match
                                ) === "Retired" ? (
                                <>{"\xa0"}</>
                              ) : (
                                <>
                                  <span
                                    style={{ backgroundColor: "#015778" }}
                                    className="table-surface-elo-label"
                                  >
                                    {player_details[0].hard_rank +
                                      " (" +
                                      player_details[0].hard_rating +
                                      ") "}
                                  </span>
                                </>
                              )}
                            </>
                          )}
                        </div>
                        <div className="hard-text" id="hard_rank">
                          {player_details[0].hard_peak_rank == null
                            ? "\xa0"
                            : player_details[0].hard_peak_rank +
                              " (" +
                              parseDate(player_details[0].hard_peak_rank_date) +
                              ") "}
                        </div>
                        <div className="hard-text" id="hard_rating">
                          {player_details[0].hard_peak_rating == null
                            ? "\xa0"
                            : player_details[0].hard_peak_rating +
                              " (" +
                              parseDate(
                                player_details[0].hard_peak_rating_date
                              ) +
                              ") "}
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-6 col-6">
                        {player_details[0].grass_rank == null ? (
                          <></>
                        ) : (
                          <div className="grass-text">Grass Rank:</div>
                        )}

                        {player_details[0].grass_peak_rank == null ? (
                          <></>
                        ) : (
                          <div className="grass-text">Peak Grass Rank:</div>
                        )}

                        {player_details[0].grass_peak_rating == null ? (
                          <></>
                        ) : (
                          <div className="grass-text">Peak Grass Rating:</div>
                        )}
                      </div>
                      <div className="col">
                        <div className="grass-text" id="grass">
                          {player_details[0].grass_rank == null ? (
                            "\xa0"
                          ) : (
                            <>
                              {player_details[0].last_match == null ? (
                                <></>
                              ) : computeStatus(
                                  player_details[0].last_match
                                ) === "Retired" ? (
                                <>{"\xa0"}</>
                              ) : (
                                <>
                                  <span
                                    style={{ backgroundColor: "#3EBA7C" }}
                                    className="table-surface-elo-label"
                                  >
                                    {player_details[0].grass_rank +
                                      " (" +
                                      player_details[0].grass_rating +
                                      ") "}
                                  </span>
                                </>
                              )}
                            </>
                          )}
                        </div>
                        <div className="grass-text" id="grass_rank">
                          {player_details[0].grass_peak_rank == null
                            ? "\xa0"
                            : player_details[0].grass_peak_rank +
                              " (" +
                              parseDate(
                                player_details[0].grass_peak_rank_date
                              ) +
                              ") "}
                        </div>
                        <div className="grass-text" id="grass_rating">
                          {player_details[0].grass_peak_rating == null
                            ? "\xa0"
                            : player_details[0].grass_peak_rating +
                              " (" +
                              parseDate(
                                player_details[0].grass_peak_rating_date
                              ) +
                              ") "}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-sm-6 col-6">
                        {player_details[0].atp_rank == null ? (
                          <></>
                        ) : (
                          <div>ATP Rank:</div>
                        )}

                        {player_details[0].atp_peak_rank == null ? (
                          <></>
                        ) : (
                          <div>Peak ATP Rank:</div>
                        )}

                        {player_details[0].atp_peak_rating == null ? (
                          <></>
                        ) : (
                          <div>
                            Peak ATP{" "}
                            {player_details[0].atp_peak_rating == null ? (
                              <>Point</>
                            ) : (
                              <>Points</>
                            )}
                            :
                          </div>
                        )}
                      </div>
                      <div className="col">
                        <div id="atp">
                          {player_details[0].atp_rating == null ? (
                            "\xa0"
                          ) : (
                            <>
                              {player_details[0].last_match == null ? (
                                <></>
                              ) : computeStatus(
                                  player_details[0].last_match
                                ) === "Retired" ? (
                                <>{"\xa0"}</>
                              ) : (
                                <>
                                  <span
                                    style={{ backgroundColor: "#000000" }}
                                    className="table-surface-elo-label"
                                  >
                                    {player_details[0].atp_rank +
                                      " (" +
                                      player_details[0].atp_rating +
                                      " pts) "}
                                  </span>
                                </>
                              )}
                            </>
                          )}
                        </div>
                        <div id="peak_atp_rank">
                          {player_details[0].atp_peak_rank == null
                            ? "\xa0"
                            : player_details[0].atp_peak_rank +
                              " (" +
                              parseDate(player_details[0].atp_peak_rank_date) +
                              ") "}
                        </div>
                        <div id="peak_atp">
                          {player_details[0].atp_peak_rating == null
                            ? "\xa0"
                            : player_details[0].atp_peak_rating +
                              " (" +
                              parseDate(
                                player_details[0].atp_peak_rating_date
                              ) +
                              ") "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PlayerChart />
        <PlayerMatches />
      </div>
    </>
  );
}
