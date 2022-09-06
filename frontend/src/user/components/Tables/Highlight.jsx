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
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}