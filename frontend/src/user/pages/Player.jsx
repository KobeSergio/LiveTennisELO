import { PlayerChart } from "../components/Charts/PlayerChart";
import { PlayerMatches } from "../components/Tables/PlayerMatches";
import ClipLoader from "react-spinners/ClipLoader";
import { Facebook, Twitter, Instagram, Globe } from "react-bootstrap-icons";

//Backend
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadPlayer, resetPlayer } from "../../features/api/apiSlice";

function parseCountry(country_id) {
  let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  return regionNames.of(country_id); // "United States
}

function parseDate(dateString) {
  var mydate = new Date();

  if (dateString.length == 8) {
    mydate = new Date(
      dateString.substring(0, 4),
      dateString.substring(4, 6),
      dateString.substring(6, 8)
    );
  } else {
    var newdate = dateString.split(" ")[0].split("-");
    console.log(newdate);
    mydate = new Date(
      newdate[2], //Year
      newdate[1], //Month
      newdate[0] // Day
    );
  }

  var dateStr = mydate.toDateString();

  return dateStr.substr(dateStr.indexOf(" ") + 1);
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
export default function Player() {
  const { player_details, player_matches, player_isLoading, player_records } =
    useSelector((state) => state.api);
  const { player_id } = useParams();

  useEffect(() => {
    dispatch(resetPlayer());
    dispatch(loadPlayer(player_id));
  }, []);

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
      <div className="p-5">
        <h1>Player Profile</h1>
        <div className="rounded-3 bg-white">
          <div className="container-fluid h-100 rounded-3 shadow p-5 mb-5">
            <div className="row h-100 py-3">
              <aside className="col-sm-2">
                <div className="mb-3">
                  <img
                    className="player_pfpic bg-transparent border-0 img-responsive img-thumbnail"
                    id="player-pfpic"
                    src={
                      player_details[0].img_link == null
                        ? `https://i.ibb.co/dBb6xnR/no-player.png`
                        : player_details[0].img_link
                    }
                  ></img>
                  <div>
                    <h1 className="fs-3 fw-bold" id="player-name">
                      {player_details[0].player_name}
                    </h1>
                  </div>
                </div>
              </aside>
              <main class="col ms-3">
                <div className="lh-lg">
                  <div>
                    <h1 className="fs-5 fw-bold pb-2">Player Information</h1>
                  </div>
                  <div className="row mb-4">
                    <div className="col-sm-2">
                      {" "}
                      {/* age, country, bithplace, height weight, socials */}
                      <div>Age:</div>
                      <div>Country:</div>
                      <div>Birthplace:</div>
                      <div>Height:</div>
                      <div>Weight:</div>
                      <div>Socials:</div>
                    </div>
                    <div className="col-sm-2">
                      {" "}
                      {/* age, country, bithplace, height weight, socials */}
                      <div className="text-dark" id="age">
                        {player_details[0].birthdate == null
                          ? "\xa0"
                          : parsebirthDate(player_details[0].birthdate) +
                            " " +
                            "(" +
                            parseDate(player_details[0].birthdate) +
                            ")"}
                      </div>
                      <div className="text-dark" id="country">
                        {player_details[0].player_id.substring(0, 2) === "UN"
                          ? "Unknown "
                          : parseCountry(
                              player_details[0].player_id.substring(0, 2)
                            )}
                      </div>
                      <div className="text-dark" id="birthplace">
                        {player_details[0].birthplace == null
                          ? "\xa0"
                          : player_details[0].birthplace}
                      </div>
                      <div className="text-dark">
                        <span className="text-dark" id="height">
                          {player_details[0].height == null
                            ? "\xa0"
                            : player_details[0].height + " cm"}
                        </span>
                      </div>
                      <div className="text-dark">
                        <span className="text-dark" id="weight">
                          {player_details[0].weight == null
                            ? "\xa0"
                            : player_details[0].weight + " kg"}
                        </span>
                      </div>
                      <div className="text-dark" id="social">
                        {player_details[0].facebook == null ? (
                          "\xa0"
                        ) : (
                          <a href={"https:/" + player_details[0].facebook}>
                            <Facebook />
                          </a>
                        )}
                        {"\xa0"}
                        {player_details[0].twitter == null ? (
                          "\xa0"
                        ) : (
                          <a href={"https:/" + player_details[0].twitter}>
                            <Twitter />
                          </a>
                        )}
                        {"\xa0"}
                        {player_details[0].instagram == null ? (
                          "\xa0"
                        ) : (
                          <a href={"https:/" + player_details[0].instagram}>
                            <Instagram />
                          </a>
                        )}
                        {"\xa0"}
                      </div>
                    </div>
                    <div className="col-sm-2">
                      {" "}
                      {/* plays, backhand, surface, website, last active */}
                      <div>Plays:</div>
                      <div>Backhand:</div>
                      <div>Favorite Surface:</div>
                      <div>Website:</div>
                      <div>Last Active:</div>
                    </div>
                    <div className="col-sm-2">
                      {" "}
                      {/* plays, backhand, surface, website, last active */}
                      <div className="text-dark" id="plays">
                        {player_details[0].hand == "L"
                          ? "Left-handed"
                          : player_details[0].hand == "R"
                          ? "Right-handed"
                          : "Unknown"}
                      </div>
                      <div className="text-dark" id="backhand">
                        {player_details[0].backhand == null
                          ? "\xa0"
                          : player_details[0].backhand}
                      </div>
                      <div className="text-dark gc-100" id="surface">
                        {player_details[0].favorite_surface == null
                          ? "\xa0"
                          : player_details[0].favorite_surface}
                      </div>
                      <div className="text-dark" id="website">
                        {player_details[0].website == null
                          ? "\xa0"
                          : player_details[0].website}
                      </div>
                      <div className="text-dark">
                        {player_details[0].last_match == null
                          ? "\xa0"
                          : parseDate(player_details[0].last_match)}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h1 className="fs-5 fw-bold pb-2">ELO Rankings</h1>
                  </div>
                  <div className="row">
                    <div className="row mb-3">
                      <div className="col-sm-2">
                        {" "}
                        {/* overall rank */}
                        <div>Overall Rank:</div>
                        <div>Peak Overall Rank:</div>
                        <div>Peak Overall Rating:</div>
                      </div>
                      <div className="col-sm-2">
                        <div id="overall">
                          {player_details[0].overall_rank == null
                            ? "\xa0"
                            : player_details[0].overall_rank +
                              " (" +
                              player_details[0].overall_rating +
                              ") "}
                        </div>
                        <div id="peak_rank">
                          {player_details[0].overall_peak_rank == null
                            ? "\xa0"
                            : player_details[0].overall_peak_rank +
                              " (" +
                              parseDate(
                                player_details[0].overall_peak_rank_date
                              ) +
                              ") "}
                        </div>
                        <div id="peak_rating">
                          {player_details[0].overall_peak_rating == null
                            ? "\xa0"
                            : player_details[0].overall_peak_rating +
                              " (" +
                              parseDate(
                                player_details[0].overall_peak_rating_date
                              ) +
                              ") "}
                        </div>
                      </div>

                      <div className="col-sm-2">
                        {" "}
                        {/* clay rank */}
                        <div className="clay-text">Clay Rank:</div>
                        <div className="clay-text">Peak Clay Rank:</div>
                        <div className="clay-text">Peak Clay Rating:</div>
                      </div>
                      <div className="col-sm-2">
                        <div className="clay-text" id="clay">
                          {player_details[0].clay_rank == null
                            ? "\xa0"
                            : player_details[0].clay_rank +
                              " (" +
                              player_details[0].clay_rating +
                              ") "}
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
                      <div className="col-sm-2">
                        {" "}
                        {/* hard rank */}
                        <div className="hard-text">Hard Rank:</div>
                        <div className="hard-text">Peak Hard Rank:</div>
                        <div className="hard-text">Peak Hard Rating:</div>
                      </div>
                      <div className="col-sm-2">
                        <div className="hard-text" id="hard">
                          {player_details[0].hard_rank == null
                            ? "\xa0"
                            : player_details[0].hard_rank +
                              " (" +
                              player_details[0].hard_rating +
                              ") "}
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

                      <div className="col-sm-2">
                        {" "}
                        {/* grass rank */}
                        <div className="grass-text">Grass Rank:</div>
                        <div className="grass-text">Peak Grass Rank:</div>
                        <div className="grass-text">Peak Grass Rating:</div>
                      </div>
                      <div className="col-sm-2">
                        <div className="grass-text" id="grass">
                          {player_details[0].grass_rank == null
                            ? "\xa0"
                            : player_details[0].grass_rank +
                              " (" +
                              player_details[0].grass_rating +
                              ") "}
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
                      <div className="col-sm-2">
                        {" "}
                        {/* atp points */}
                        <div>ATP Rank:</div>
                        <div>Peak ATP Rank:</div>
                        <div>Peak ATP Points:</div>
                      </div>
                      <div className="col-sm-2">
                        <div id="atp">
                          {player_details[0].atp_rating == null
                            ? "\xa0"
                            : player_details[0].atp_rank +
                              " (" +
                              player_details[0].atp_rating +
                              " pts) "}
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
              </main>
            </div>
          </div>
        </div>
        <PlayerChart />
        <PlayerMatches />
      </div>
    </>
  );
}
