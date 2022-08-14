import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

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
    console.log("CLICKED");
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
