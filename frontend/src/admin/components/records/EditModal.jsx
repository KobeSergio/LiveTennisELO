import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { EditRecordTable } from "./EditRecordField";
import { Pencil } from "react-bootstrap-icons";

export function EditRecord(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <a href="#" onClick={handleShow} className="color-1">
        <Pencil />
      </a>
      <Modal show={show} onHide={handleClose} size="xl" centered>
        <form>
          <EditRecordTable />
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
              onClick={handleClose}
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
