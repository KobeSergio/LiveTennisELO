import bg_img from "../img/bg-charts2.png";

import Dropdown from "react-bootstrap/Dropdown";
import { drawChart } from "../../features/api/apiSlice";
import Graph from "../components/Charts/Graph";
import Footer from "../components/Footer/Footer";
import { loadData } from "../../features/api/apiSlice";
import { Pencil } from "react-bootstrap-icons";
import Button from "react-bootstrap/esm/Button";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import ReactGA from "react-ga4";

function parseCountry(country_id) {
  let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  return regionNames.of(country_id); // "United States
}

export default function Charts() {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { players, api_isLoading, charts } = useSelector((state) => state.api);
  const [filter, setFilter] = useState("ELO Ratings");
  const [invert, setInvert] = useState(false);
  const [type, setType] = useState("time");
  const [surface, setSurface] = useState("Overall");
  const opts = [];

  useEffect(() => {
    if (players.length == 0) {
      dispatch(loadData());
    }
  }, []);

  useEffect(() => {
    players.forEach((player) =>
      opts.push({ value: player.player_id, label: player.player_name })
    );
    setPlayers(opts);
  }, [api_isLoading]);

  //Select Box
  const [playerOptions, setPlayers] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const handleInputChange = useCallback((typedOption) => {
    if (typedOption.length > 2) {
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  }, []);

  const handleSelect = (selectedOption) => {
    setSelectedPlayers(
      Array.isArray(selectedOption) ? selectedOption.map((x) => x.value) : []
    );
  };

  const onDraw = () => {
    if (selectedPlayers.length > 1) {
      dispatch(drawChart(selectedPlayers.join(",")));
    }
  };
  return (
    <>
      <div className="charts-bg" style={{ backgroundImage: `url(${bg_img})` }}>
        <div className="px-4 py-4">
          <div className="row">
            <div className="col-lg-3 col-sm-12 col-12 p2">
              <h1 className="fs-3">Chart Comparison</h1>
              <p>
                You can compare players’ ELO Rating and ranking charts by
                clicking "Add Player".
              </p>
              <div className="d-flex mb-4">
                <span className="me-2 col-form-label w-25">Rank Type:</span>
                <Dropdown className="border border-dark dropdown mx-2 rounded-3">
                  <Dropdown.Toggle
                    variant="white"
                    id="dropdown-basic"
                    size="lg"
                  >
                    {filter}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => {
                        setFilter("ELO Ratings");
                        setInvert(false);
                        setType("time");
                      }}
                      href="#/"
                    >
                      ELO Ratings
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setFilter("ELO Rankings");
                        setInvert(true);
                        setType("time");
                      }}
                      href="#/"
                    >
                      ELO Rankings
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setFilter("ELO Ratings by Age");
                        setInvert(false);
                        setType("linear");
                      }}
                      href="#/"
                    >
                      ELO Ratings by Age
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setFilter("ELO Rankings by Age");
                        setInvert(true);
                        setType("linear");
                      }}
                      href="#/"
                    >
                      ELO Rankings by Age
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="d-flex mb-4">
                <span className="me-2 col-form-label w-25">Surface:</span>
                <Dropdown className="border border-dark dropdown mx-2 rounded-3">
                  <Dropdown.Toggle
                    variant="white"
                    id="dropdown-basic"
                    size="lg"
                  >
                    {surface}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => {
                        setSurface("Overall");
                      }}
                      href="#/"
                    >
                      Overall
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setSurface("Hard");
                      }}
                      href="#/"
                    >
                      Hard
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setSurface("Clay");
                      }}
                      href="#/"
                    >
                      Clay
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setSurface("Grass");
                      }}
                      href="#/"
                    >
                      Grass
                    </Dropdown.Item>
                    {/* <Dropdown.Item
                      onClick={() => {
                        setSurface("ATP");
                      }}
                      href="#/"
                    >
                      ATP
                    </Dropdown.Item> */}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <Select
                placeholder={"Select Players..."}
                closeMenuOnSelect={false}
                components={{
                  makeAnimated: () => true,
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                }}
                defaultValue={[]}
                isMulti
                options={showOptions ? playerOptions : []}
                menuIsOpen={showOptions ? true : false}
                onInputChange={handleInputChange}
                onChange={handleSelect}
                isOptionDisabled={() => selectedPlayers.length >= 2}
              />
              <p className="pt-2 m-1" style={{ color: "gray" }}>
                Search for a player by typing their names above. Only 2 players
                can be compared.
              </p>
              {/* Add Players */}
              <div className="d-grid my-3 gap-2">
                <div className="d-flex gap-2">
                  {charts != null ? (
                    <>
                      <div className="card border-0 w-50">
                        <div className="card-header rounded-top-3 p1-100-bg border-0 h-25"></div>
                        <div className="card-body px-3 py-2">
                          <h5 className="card-title">
                            <a
                              href="#/"
                              onClick={() => {
                                navigate(
                                  "/players/" + charts.players[0].player_id
                                );
                              }}
                            >
                              {charts.players[0].player_name}
                            </a>
                          </h5>
                          <p className="card-text fw-normal">
                            {parseCountry(
                              charts.players[0].player_id.substring(0, 2)
                            )}
                            ,{" "}
                            {charts.players[0].birthdate == null ? (
                              <></>
                            ) : (
                              charts.players[0].birthdate.slice(0, 4)
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="card border-0 w-50">
                        <div className="card-header rounded-top-3 p2-100-bg border-0 h-25"></div>
                        <div className="card-body px-3  py-2">
                          <h5 className="card-title">
                            <a
                              href="#/"
                              onClick={() => {
                                navigate(
                                  "/players/" + charts.players[1].player_id
                                );
                              }}
                            >
                              {charts.players[1].player_name}
                            </a>
                          </h5>
                          <p className="card-text fw-normal">
                            {parseCountry(
                              charts.players[1].player_id.substring(0, 2)
                            )}
                            ,{" "}
                            {charts.players[1].birthdate == null ? (
                              <></>
                            ) : (
                              charts.players[1].birthdate.slice(0, 4)
                            )}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              {/* Draw Chart Button */}
              <Button
                className="d-flex-inline align-items-center gc-100-button w-100"
                onClick={onDraw}
              >
                <Pencil color="white" className="me-2" size={18} /> Draw Chart
              </Button>
            </div>
            <div className="col-lg-9 col-sm-12 col-12">
              <Graph
                invert={invert}
                filter={filter}
                type={type}
                surface={surface}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
