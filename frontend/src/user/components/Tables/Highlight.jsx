import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { CameraVideo, PlusLg } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { insertHighlight } from "../../../features/players/playerSlice";

export function ShowHighlight(props) {
  //Frontend stuff
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    highlight: "",
  });

  const { highlight } = formData;

  const matchData = {
    highlight,
  };

  return (
    <>
      <a href="#/">
        <CameraVideo size={16} color="blacks" onClick={handleShow} />{" "}
      </a>

      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton className="mx-4">
          <Modal.Title>Highlights</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row px-5 rounded">
            <main className="col ms-3">
              <div className="videoWrapper">
                <iframe
                  className="iframe"
                  src={"https://www.youtube.com/embed/" + props.src.slice(-11)}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              </div>
            </main>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              dispatch(insertHighlight([matchData, props.props])).then(() =>
                window.location.reload(false)
              );
            }}
            className="ms-2 btn btn-danger btn-sm me-4"
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
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export function AddHighlight(props) {
  //Frontend stuff
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    highlight: "/",
  });

  const { highlight } = formData;

  const matchData = {
    highlight,
  };
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(insertHighlight([matchData, props.props]));
    window.location.reload(false);
  };

  return (
    <>
      <a href="#/">
        <PlusLg size={16} color="blacks" onClick={handleShow} />
      </a>

      <Modal show={show} onHide={handleClose} size="m">
        <form onSubmit={onSubmit}>
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
                      id="highlight"
                      name="highlight"
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
