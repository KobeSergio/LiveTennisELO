import React from "react";
import "./main.css";
import { Search } from "react-bootstrap-icons";
import { NavLink, useNavigate } from "react-router-dom";
import Select from "react-select";
import { useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";

const customStyles = {
  control: (base, state) => ({
    ...base,
    boxShadow: 0,
    border: "none",
    height: 43,
    width: 250,
    // You can also use state.isFocused to conditionally style based on the focus state
  }),
};
export default function Navbar() {
  const navigate = useNavigate();

  const { players, api_isLoading } = useSelector((state) => state.api);
  const [playerOptions, setPlayers] = useState([]);

  const opts = [];
  useEffect(() => {
    players.forEach((player) =>
      opts.push({ value: player.player_id, label: player.player_name })
    );
    setPlayers(opts);
  }, [api_isLoading]);

  const handleSelect = (selectedOption) => {
    window.location.href = "players/" + selectedOption.value;
  };

  const [showOptions, setShowOptions] = useState(false);
  const handleInputChange = useCallback((typedOption) => {
    if (typedOption.length > 2) {
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  }, []);

  return [
    <nav
      className="navbar navbar-expand-md px-3 py-3 navbar-light bg-light border-bottom border-2 rounded-bottom"
      aria-label="Fourth navbar example"
    >
      <div className="container-fluid">
        <a className="navbar-brand fw-bold">Live Tennis ELO Ratings</a>
        <div className="navbar-nav me-auto ms-5">
          <NavLink
            className="nav-link me-4"
            activeclassname="nav-link active add_underline"
            to="/"
          >
            <a data-toggle="pill" role="tab" aria-selected="false">
              Live Ratings
            </a>
          </NavLink>
          <NavLink
            className="nav-link me-4"
            activeclassname="nav-link active"
            to="/charts"
          >
            <a data-toggle="pill" role="tab" aria-selected="false">
              Charts
            </a>
          </NavLink>
          <NavLink
            className="nav-link"
            activeclassname="nav-link active"
            to="/about"
          >
            <a data-toggle="pill" aria-selected="false">
              About
            </a>
          </NavLink>
        </div>
        {api_isLoading ? (
          <></>
        ) : (
          <>
            <form>
              <div className="input-group">
                <Select
                  options={showOptions ? playerOptions : []}
                  menuIsOpen={showOptions ? true : false}
                  onInputChange={handleInputChange}
                  name="language"
                  placeholder="Search Player"
                  styles={customStyles}
                  components={{
                    IndicatorsContainer: () => null,
                  }}
                  onChange={handleSelect}
                  search
                />
                <div className="input-group-prepend">
                  <span class="input-group-button">
                    <button
                      className="btn btn-green search-btn px-3 py-1"
                      type="submit"
                    >
                      <Search color="white" className="fs-7" />
                    </button>
                  </span>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </nav>,
  ];
}
