import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";

import { Pencil, Windows, X } from "react-bootstrap-icons";
//Backend
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  updateMatch,
  updatePlayer,
} from "../../../features/players/playerSlice";

function parseDate(date) {
  var dateString = date.toString();
  return dateString.substring(0, 4) + "-" + dateString.substring(4, 6);
}

export default function EditMatch(props) {
  const dispatch = useDispatch();
  const { match, player_id } = props.props;
  //Frontend stuff
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    match_num: props.props.match.match_num,
    round: props.props.match.round,
    score: props.props.match.score,
    surface: props.props.match.surface,
    highlight: props.props.match.highlight,
    winner_elo: props.props.match.winner_elo,
    winner_elo_gains: props.props.match.winner_elo_gains,
    winner_elo_surface: props.props.match.winner_elo_surface,
    winner_elo_surface_gains: props.props.match.winner_elo_surface_gains,
    loser_elo: props.props.match.loser_elo,
    loser_elo_gains: props.props.match.loser_elo_gains,
    loser_elo_surface: props.props.match.loser_elo_surface,
    loser_elo_surface_gains: props.props.match.loser_elo_surface_gains,
  });

  useEffect(() => {
    setFormData({
      match_num: props.props.match.match_num,
      round: props.props.match.round,
      score: props.props.match.score,
      surface: props.props.match.surface,
      highlight: props.props.match.highlight,
      winner_elo: props.props.match.winner_elo,
      winner_elo_gains: props.props.match.winner_elo_gains,
      winner_elo_surface: props.props.match.winner_elo_surface,
      winner_elo_surface_gains: props.props.match.winner_elo_surface_gains,
      loser_elo: props.props.match.loser_elo,
      loser_elo_gains: props.props.match.loser_elo_gains,
      loser_elo_surface: props.props.match.loser_elo_surface,
      loser_elo_surface_gains: props.props.match.loser_elo_surface_gains,
    });
  }, [show]);

  const {
    match_num,
    round,
    score,
    surface,
    highlight,
    winner_elo,
    winner_elo_gains,
    winner_elo_surface,
    winner_elo_surface_gains,
    loser_elo,
    loser_elo_gains,
    loser_elo_surface,
    loser_elo_surface_gains,
  } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const dynamic = document.getElementById("dynamic-checkbox").checked;

    const MatchData = {
      match_num,
      round,
      score,
      surface,
      highlight,
      winner_elo,
      winner_elo_gains,
      winner_elo_surface,
      winner_elo_surface_gains,
      loser_elo,
      loser_elo_gains,
      loser_elo_surface,
      loser_elo_surface_gains,
      dynamic,
    };

    const oldData = {
      tourney_date: props.props.match.tourney_date,
      tourney_id: props.props.match.tourney_id,
      winner_local_id: props.props.match.winner_local_id,
      loser_local_id: props.props.match.loser_local_id,
      match_num: props.props.match.match_num,
      round: props.props.match.round,
      score: props.props.match.score,
      surface: props.props.match.surface,
      highlight: props.props.match.highlight,
      winner_elo: props.props.match.winner_elo,
      winner_elo_gains: props.props.match.winner_elo_gains,
      winner_elo_surface: props.props.match.winner_elo_surface,
      winner_elo_surface_gains: props.props.match.winner_elo_surface_gains,
      loser_elo: props.props.match.loser_elo,
      loser_elo_gains: props.props.match.loser_elo_gains,
      loser_elo_surface: props.props.match.loser_elo_surface,
      loser_elo_surface_gains: props.props.match.loser_elo_surface_gains,
    };

    dispatch(updateMatch([props.props.match._id, MatchData, oldData]));
    window.location.reload(false);
  };

  return (
    <>
      <a href="#/" onClick={handleShow} className="color-1">
        <Pencil />
      </a>
      <Modal show={show} onHide={handleClose} size="xl" centered>
        <div className="modal-header">
          {/* flex justify between */}
          <h5 className="modal-title">Edit Match</h5>
          <a href="#/" onClick={handleClose} className="color-1">
            <X />
          </a>
        </div>
        <form onSubmit={onSubmit}>
          <div
            className="py-2 rounded"
            style={{ borderRadius: "10px 10px 0 0" }}
          >
            <div className="input-group">
              <table className="table shadow-none table-borderless text-center">
                <thead>
                  <tr>
                    <th scope="col">
                      <b>Match Num</b>
                    </th>
                    <th scope="col">
                      <b>Round</b>
                    </th>
                    <th scope="col">
                      <b>Score</b>
                    </th>
                    <th scope="col">
                      <b>Surface</b>
                    </th>
                    <th scope="col">
                      <b>Highlight</b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td scope="col">
                      <input
                        className="w-100 form-input"
                        type="number"
                        id="match_num"
                        name="match_num"
                        placeholder={match.match_num}
                        onChange={onChange}
                      />
                    </td>
                    <td scope="col">
                      <input
                        className="w-100 form-input"
                        type="text"
                        id="round"
                        name="round"
                        placeholder={match.round}
                        onChange={onChange}
                      />
                    </td>
                    <td scope="col">
                      <input
                        className="w-100 form-input"
                        type="text"
                        id="score"
                        name="score"
                        placeholder={match.score}
                        onChange={onChange}
                      />
                    </td>
                    <td>
                      <input
                        className="w-100 form-input"
                        type="text"
                        id="surface"
                        name="surface"
                        placeholder={match.surface}
                        onChange={onChange}
                      />
                    </td>
                    <td>
                      <input
                        className="w-100 form-input"
                        type="text"
                        id="highlight"
                        name="highlight"
                        placeholder={match.highlight}
                        onChange={onChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="input-group">
              <table className="table shadow-none table-borderless text-center">
                <thead>
                  <tr>
                    <th scope="col">
                      <b>Winner ID</b>
                    </th>
                    <th scope="col">
                      <b>Winner Name</b>
                    </th>
                    <th scope="col">
                      <b>Winner ELO </b>
                    </th>
                    <th scope="col">
                      <b>Gains</b>
                    </th>
                    <th scope="col">
                      <b>Winner Surf. ELO </b>
                    </th>
                    <th scope="col">
                      <b>Surf. Gains</b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td scope="col">
                      <input
                        className="w-100 form-input"
                        type="text"
                        id="winner_local_id"
                        name="winner_local_id"
                        placeholder={match.winner_local_id}
                        onChange={onChange}
                      />
                    </td>
                    <td scope="col">
                      <input
                        className="w-100 form-input"
                        type="text"
                        id="winner_name"
                        name="winner_name"
                        placeholder={match.winner_name}
                        onChange={onChange}
                      />
                    </td>
                    <td scope="col">
                      <input
                        className="w-100 form-input"
                        type="number"
                        id="winner_elo"
                        name="winner_elo"
                        placeholder={match.winner_elo}
                        onChange={onChange}
                      />
                    </td>
                    <td scope="col">
                      <input
                        className="w-100 form-input"
                        type="number"
                        id="winner_elo_gains"
                        name="winner_elo_gains"
                        placeholder={match.winner_elo_gains}
                        onChange={onChange}
                      />
                    </td>
                    <td scope="col">
                      <input
                        className="w-100 form-input"
                        type="number"
                        id="winner_elo_surface"
                        name="winner_elo_surface"
                        placeholder={match.winner_elo_surface}
                        onChange={onChange}
                      />
                    </td>
                    <td scope="col">
                      <input
                        className="w-100 form-input"
                        type="number"
                        id="winner_elo_surface_gains"
                        name="winner_elo_surface_gains"
                        placeholder={match.winner_elo_surface_gains}
                        onChange={onChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="input-group">
              <table className="table shadow-none table-borderless text-center">
                <thead>
                  <tr>
                    <th scope="col">
                      <b>Loser ID</b>
                    </th>
                    <th scope="col">
                      <b>Loser Name</b>
                    </th>
                    <th scope="col">
                      <b>Loser ELO</b>
                    </th>
                    <th scope="col">
                      <b>Gains</b>
                    </th>
                    <th scope="col">
                      <b>Loser Surf. ELO </b>
                    </th>
                    <th scope="col">
                      <b>Surf. Gains</b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td scope="col">
                      <input
                        className="w-100 form-input"
                        type="text"
                        id="loser_local_id"
                        name="loser_local_id"
                        placeholder={match.loser_local_id}
                        onChange={onChange}
                      />
                    </td>
                    <td scope="col">
                      <input
                        className="w-100 form-input"
                        type="text"
                        id="loser_name"
                        name="loser_name"
                        placeholder={match.loser_name}
                        onChange={onChange}
                      />
                    </td>
                    <td scope="col">
                      <input
                        className="w-100 form-input"
                        type="number"
                        id="loser_elo"
                        name="loser_elo"
                        placeholder={match.loser_elo}
                        onChange={onChange}
                      />
                    </td>
                    <td scope="col">
                      <input
                        className="w-100 form-input"
                        type="number"
                        id="loser_elo_gains"
                        name="loser_elo_gains"
                        placeholder={match.loser_elo_gains}
                        onChange={onChange}
                      />
                    </td>
                    <td scope="col">
                      <input
                        className="w-100 form-input"
                        type="number"
                        id="loser_elo_surface"
                        name="loser_elo_surface"
                        placeholder={match.loser_elo_surface}
                        onChange={onChange}
                      />
                    </td>
                    <td scope="col">
                      <input
                        className="w-100 form-input"
                        type="number"
                        id="loser_elo_surface_gains"
                        name="loser_elo_surface_gains"
                        placeholder={match.loser_elo_surface_gains}
                        onChange={onChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <Modal.Footer>
            <input id="dynamic-checkbox" name="dynamic" type="checkbox" />
            <p>Make Dynamic</p>
            <Button
              onClick={handleClose}
              className="btn btn-gray btn-sm"
              style={{
                fontSize: "16px",
                borderWidth: "0px",
                width: "100px",
                height: "30px",
                fontWeight: "500",
              }}
            >
              Cancel
            </Button>
            <Button
              type="Submit"
              className="ms-2 btn btn-green btn-sm me-4"
              style={{
                fontSize: "16px",
                borderWidth: "0px",
                width: "80px",
                height: "30px",
                fontWeight: "500",
              }}
            >
              {" "}
              {/* handle data here */}
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
