import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Table, People, Upload, Search } from "react-bootstrap-icons";
import Footer from "../components/Footer";
import { useEffect, useState, useCallback } from "react";
//Backend
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import { resetRecords } from "../../features/records/recordsSlice";

import Select from "react-select";
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

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    dispatch(resetRecords());
    navigate("/admin-login");
  };

  const { players, players_isLoading } = useSelector((state) => state.players);
  const [playerOptions, setPlayers] = useState([]);

  const opts = [];
  useEffect(() => {
    players.forEach((player) =>
      opts.push({ value: player.player_id, label: player.player_name })
    );
    setPlayers(opts);
  }, [players_isLoading]);

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
    <nav className="navbar px-3 py-3 navbar-light">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="">
          Live Tennis ELO Ratings
        </a>
        {players_isLoading ? (
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
        <button
          className="btn bg-transparent px-3 py-1"
          type="submit"
          title="Logout"
          onClick={onLogout}
        >
          <img
            src={require("../img/Logout.png")}
            className="input-group-prepend bg-transparent border-0"
          ></img>
        </button>
      </div>
    </nav>
  );
}

function Sidebar() {
  const { latest } = useSelector((state) => state.records);
  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <aside className="col-md-2 col-xl-2 px-sm-2 px-0 py-3">
          <div className="align-items-center align-items-sm-start px-3 pt-3 text-white min-vh-50">
            <div className="col-10">
              <div
                className="nav flex-column nav-pills gap-3"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <NavLink
                  className="nav-link"
                  activeclassname="nav-link active"
                  to={`/admin/` + latest}
                >
                  <a data-toggle="pill" role="tab" aria-selected="false">
                    <Table size={15} className="mb-1 me-3" />
                    Records
                  </a>
                </NavLink>

                <NavLink
                  className="nav-link"
                  activeclassname="nav-link active"
                  to="/admin/players"
                >
                  <a data-toggle="pill" role="tab" aria-selected="false">
                    <People size={15} className="mb-1 me-3" />
                    Players
                  </a>
                </NavLink>

                <NavLink
                  className="nav-link"
                  activeclassname="nav-link active"
                  to="/admin/import"
                >
                  <a data-toggle="pill" aria-selected="false">
                    <Upload size={15} className="mb-1 me-3" />
                    Import
                  </a>
                </NavLink>
              </div>
            </div>
          </div>
        </aside>

        <div className="bg-admin d-flex flex-column">
          <div className="container-fluid">
            <div className="mt-5">
              <Outlet />
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}

function AdminNav() {
  return (
    <>
      <Navbar />
      <Sidebar />
    </>
  );
}

export default AdminNav;
