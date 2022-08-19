import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { CameraVideo } from "react-bootstrap-icons";

//Backend
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updatePlayer } from "../../../features/players/playerSlice";

export function AddHighlight(player) {
  //Frontend stuff
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChange = (e) => {};

  return (
    <>
      <CameraVideo size={16} color="blacks" onClick={handleShow} />

      <Modal show={show} onHide={handleClose} size="m">
        <form>
          <Modal.Header closeButton className="mx-4">
            <Modal.Title>Highlights</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row px-5 rounded">
              <main className="col ms-3">
                <div className="row">
                  <Form.Group className="mb-3">
                    <Form.Label>Video Link:</Form.Label>
                    <Form.Control
                      type="text"
                      size="sm"
                      className="form-control-border"
                      id="nicknames"
                      name="nicknames"
                      onChange={onChange}
                      autoFocus
                    />
                  </Form.Group>
                </div>
              </main>
            </div>
          </Modal.Body>
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
