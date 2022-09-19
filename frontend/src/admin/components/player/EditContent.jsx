import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

import { Pencil } from "react-bootstrap-icons";
//Backend
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updatePlayer } from "../../../features/players/playerSlice";
export function EditContent(player) {
  //Frontend stuff
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Update backend
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { player_id } = useParams();

  const [formData, setFormData] = useState({
    img_link: player.player.img_link,
    birthdate: player.player.birthdate,
    birthplace: player.player.birthplace,
    height: player.player.height,
    weight: player.player.weight,
    hand: player.player.hand,
    backhand: player.player.backhand,
    wiki: player.player.wiki,
    twitter: player.player.twitter,
    facebook: player.player.facebook,
    instagram: player.player.instagram,
    nicknames: player.player.nicknames,
  });

  const {
    img_link,
    birthdate,
    birthplace,
    height,
    weight,
    hand,
    backhand,
    wiki,
    twitter,
    facebook,
    instagram,
    nicknames,
  } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    const PlayerData = {
      img_link,
      birthdate,
      birthplace,
      height,
      weight,
      hand,
      backhand,
      wiki,
      twitter,
      facebook,
      instagram,
      nicknames,
    };
    const routeDetails = {
      _id: player.player._id,
      player_id: player_id,
    };
    dispatch(updatePlayer([routeDetails, PlayerData])).then(() => {
      window.location.reload(false);
    });
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      <Button
        onClick={handleShow}
        className="ms-4 px-2 btn btn-green btn-sm float-end"
        style={{
          fontSize: "18px",
          borderWidth: "0px",
          width: "150px",
          height: "40px",
          fontWeight: "600",
        }}
      >
        Edit Content
      </Button>

      <Modal show={show} onHide={handleClose} size="xl">
        <form onSubmit={onSubmit}>
          <Modal.Header closeButton className="mx-4">
            <Modal.Title>Fill out optional fields</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row px-5 rounded">
              <aside className="col-sm-3 me-4">
                <div className="mb-3">
                  <img
                    className="player_pfpic bg-transparent border-0 img-fluid"
                    id="player-pfpic"
                    src={
                      player.player.img_link == null
                        ? `https://i.ibb.co/dBb6xnR/no-player.png`
                        : player.player.img_link
                    }
                  ></img>
                  <div className="row justify-content-center">
                    <Form.Group className="mb-3">
                      <Form.Label>Image Link:</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        className="form-control-border"
                        id="img_link"
                        name="img_link"
                        placeholder={player.player.img_link}
                        onChange={onChange}
                        autoFocus
                      />
                    </Form.Group>
                  </div>
                  <div>
                    <span className="text-secondary me-4">Player Id: </span>
                    <span className="pt-1 gc-100" id="player-id">
                      {player.player.player_id}
                    </span>
                  </div>
                  <div>
                    <h1 className="fs-3 fw-bold" id="player-name">
                      {player.player.player_name}
                    </h1>
                  </div>
                </div>
              </aside>

              <main className="col ms-3">
                <h1 className="fs-5 fw-bold mb-4">Player Information:</h1>
                <div className="row">
                  <div className="col-sm-3 me-5">
                    <Form.Group className="mb-3">
                      <Form.Label>Birthdate:</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        className="form-control-border"
                        id="birthdate"
                        name="birthdate"
                        placeholder={player.player.birthdate}
                        onChange={onChange}
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Birthplace:</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        className="form-control-border"
                        id="birthplace"
                        name="birthplace"
                        placeholder={player.player.birthplace}
                        onChange={onChange}
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Height:</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        className="form-control-border"
                        id="height"
                        name="height"
                        placeholder={player.player.height}
                        onChange={onChange}
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Weight:</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        className="form-control-border"
                        id="weight"
                        name="weight"
                        placeholder={player.player.weight}
                        onChange={onChange}
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Plays:</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        className="form-control-border"
                        id="hand"
                        name="hand"
                        placeholder={player.player.hand}
                        onChange={onChange}
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Backhand:</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        className="form-control-border"
                        id="backhand"
                        name="backhand"
                        placeholder={player.player.backhand}
                        onChange={onChange}
                        autoFocus
                      />
                    </Form.Group>
                  </div>

                  <div className="col-sm-3 ms-5">
                    <Form.Group className="mb-3">
                      <Form.Label>Wiki:</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        className="form-control-border"
                        id="wiki"
                        name="wiki"
                        placeholder={player.player.wiki}
                        onChange={onChange}
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Twitter:</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        className="form-control-border"
                        id="twitter"
                        name="twitter"
                        placeholder={player.player.twitter}
                        onChange={onChange}
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Facebook:</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        className="form-control-border"
                        id="facebook"
                        name="facebook"
                        placeholder={player.player.facebook}
                        onChange={onChange}
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Instagram:</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        className="form-control-border"
                        id="instagram"
                        name="instagram"
                        placeholder={player.player.instagram}
                        onChange={onChange}
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Nicknames:</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        className="form-control-border"
                        id="nicknames"
                        name="nicknames"
                        placeholder={player.player.nicknames}
                        onChange={onChange}
                        autoFocus
                      />
                    </Form.Group>
                  </div>
                </div>
              </main>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <span className="text-left ms-5 me-auto">
              * Age auto generated by birthdate
            </span>

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

function arrangeScore(player_id, match) {
  try {
    var set = match.score.split(" ");
  } catch (error) {
    var set = match.score;
  }
  var fixed = [];
  if (match.winner_local_id == player_id) {
    return match.score;
  } else {
    try {
      if (set.length > 1) {
        set.forEach((score) => {
          var temp = "";
          temp = score[0];
          try {
            score = score.replaceAt(0, score[2]);
            score = score.replaceAt(2, temp);
          } catch {
            console.log("ha");
          }
          fixed.push(score);
        });
        return fixed.join([" "]);
      }
    } catch (error) {
      return match.score;
    }
  }
}

function parseDate(date) {
  var dateString = date.toString();
  return dateString.substring(0, 4) + "-" + dateString.substring(4, 6);
}
function checkOpp(player_id, match) {
  var result = "L";
  var opponent = "";
  var opponent_id = "";
  var opp_rating = 2400;
  var opp_surface_rating = 2400;
  var opp_rating_gains = 0;
  var opp_surface_rating_gains = 0;

  if (match.winner_local_id == player_id) {
    if (match.loser_elo != null) {
      opp_rating = match.loser_elo;
      opp_surface_rating = match.loser_elo_surface;
    }
    result = "W";
    opponent = match.loser_name;
    opponent_id = match.loser_local_id;
    opp_rating_gains = match.loser_elo_gains;
    opp_surface_rating_gains = match.loser_elo_surface_gains;
  } else if (match.loser_local_id == player_id) {
    if (match.winner_elo != null) {
      opp_rating = match.loser_elo;
      opp_surface_rating = match.winner_elo_surface;
    }
    result = "L";
    opponent = match.winner_name;
    opponent_id = match.winner_local_id;
    opp_rating = match.winner_elo;
    opp_rating_gains = match.winner_elo_gains;
    opp_surface_rating_gains = match.winner_elo_surface_gains;
  } else {
    //Player not found
  }
  return { 
    result: result,
    opponent: opponent,
    opponent_id: opponent_id,
    opp_rating: opp_rating,
    opp_rating_gains: opp_rating_gains,
    opp_surface_rating: opp_surface_rating,
    opp_surface_rating_gains: opp_surface_rating_gains,
  };
}

export function EditMatch(props) {
  const { match, player_id } = props.props;
  //Frontend stuff
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onSubmit = (e) => {
    e.preventDefault();
    // const PlayerData = {
    //   img_link,
    //   birthdate,
    //   birthplace,
    //   height,
    //   weight,
    //   hand,
    //   backhand,
    //   wiki,
    //   twitter,
    //   facebook,
    //   instagram,
    //   nicknames,
    // };
    // const routeDetails = {
    //   _id: player.player._id,
    //   player_id: player_id,
    // };
    // dispatch(updatePlayer([routeDetails, PlayerData])).then(() => {
    //   window.location.reload(false);
    // });
  };
  const [formData, setFormData] = useState({
    ranking: props.props.ranking,
    hard: props.props.hard,
    clay: props.props.clay,
    grass: props.props.grass,
    atp: props.props.atp,
    lactive: props.props.last_active,
  });

  const { ranking, hard, clay, grass, atp, lactive } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <a href="#/" onClick={handleShow} className="color-1">
        <Pencil />
      </a>
      <Modal show={show} onHide={handleClose} size="xl" centered>
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
                      <b>Date</b>
                    </th>
                    <th scope="col">
                      <b>Result</b>
                    </th>
                    <th scope="col">
                      <b>Opponent</b>
                    </th>
                    <th scope="col">
                      <b>Opp. Overall Rating</b>
                    </th>
                    <th scope="col">
                      <b>Gains</b>
                    </th>
                    <th scope="col">
                      <b>Opp. Surface ELO</b>
                    </th>
                    <th scope="col">
                      <b>Gains</b>
                    </th>
                    <th scope="col">
                      <b>Score</b>
                    </th>
                    <th scope="col">
                      <b>Tournament</b>
                    </th>
                    <th scope="col">
                      <b>Round</b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td scope="col" id="date">
                      {parseDate(match.tourney_date)}
                    </td>
                    <td scope="col" id="result">
                      {checkOpp(player_id, match).result}
                    </td>
                    <td scope="col" id="opponent">
                      {checkOpp(player_id, match).opponent}
                    </td>
                    <td scope="col" id="opp_rating">
                      <input
                        className="w-100 form-input"
                        type="text"
                        id="ranking"
                        name="ranking"
                        placeholder={checkOpp(player_id, match).opp_rating}
                        onChange={onChange}
                      />
                    </td>
                    <td scope="col" id="opp_rating_gains">
                      <input
                        className="w-100 form-input"
                        type="text"
                        id="ranking"
                        name="ranking"
                        placeholder={
                          checkOpp(player_id, match).opp_rating_gains
                        }
                        onChange={onChange}
                      />
                    </td>
                    <td scope="col" id="opp_surface_rating">
                      <input
                        className="w-100 form-input"
                        type="text"
                        id="ranking"
                        name="ranking"
                        placeholder={
                          checkOpp(player_id, match).opp_surface_rating
                        }
                        onChange={onChange}
                      />
                    </td>
                    <td scope="col" id="opp_surface_rating_gains">
                      <input
                        className="w-100 form-input"
                        type="text"
                        id="ranking"
                        name="ranking"
                        placeholder={
                          checkOpp(player_id, match).opp_surface_rating_gains
                        }
                        onChange={onChange}
                      />
                    </td>
                    <td scope="col" id="opp_surface_rating_gains">
                      {arrangeScore(player_id, match)}
                    </td>
                    <td className="col" id="tournament">
                      {match.tourney_name}
                    </td>
                    <td className="table-round" id="round">
                      {match.round}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <Modal.Footer>
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
