import React from "react";
import "./main.css";
import { Search } from "react-bootstrap-icons";
import { NavLink, useNavigate } from "react-router-dom";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { loadPlayerList } from "../../features/api/apiSlice";
import banner from "../img/TenELOs.png";

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
export default function ClientNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { players, api_isLoading } = useSelector((state) => state.api);
  const [playerOptions, setPlayers] = useState([]);
  const opts = [];

  useEffect(() => {
    dispatch(loadPlayerList());
  }, []);

  useEffect(() => {
    players.forEach((player) =>
      opts.push({ value: player.player_id, label: player.player_name })
    );
    setPlayers(opts);
  }, [players]);

  const handleSelect = (selectedOption) => {
    navigate("players/" + selectedOption.value);
  };

  const [showOptions, setShowOptions] = useState(false);
  const handleInputChange = useCallback((typedOption) => {
    if (typedOption.length > 2) {
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  }, []);

  return (
    <>
      {/* Running image banner */} 
      <img
        src={banner}
        class="img-fluid ratio ratio-1x1"
        alt="Responsive image"
      /> 
      <Navbar className="px-4 py-3" bg="light" expand="lg">
        <Navbar.Brand
          className="fw-bold"
          href="#"
          onClick={() => navigate("/")}
        >
          Live Tennis ELO Ratings
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-4 me-auto">
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
              className="nav-link me-4"
              activeclassname="nav-link active"
              to="/players"
            >
              <a data-toggle="pill" role="tab" aria-selected="false">
                Players
              </a>
            </NavLink>
            <NavLink
              className="nav-link me-4"
              activeclassname="nav-link active"
              to="/tournaments"
            >
              <a data-toggle="pill" role="tab" aria-selected="false">
                Tournaments
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
          </Nav>
          {api_isLoading ? (
            <></>
          ) : (
            <>
              <form>
                <div className="ms-3 input-group">
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
                        type="button"
                      >
                        <Search color="white" className="fs-7" />
                      </button>
                    </span>
                  </div>
                </div>
              </form>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
