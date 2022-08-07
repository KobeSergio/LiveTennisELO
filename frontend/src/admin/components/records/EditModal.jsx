import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap"; 
import { Pencil } from "react-bootstrap-icons";
import "../../../css/admin/borders.css";

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
          <div
            className="py-3 bg-white rounded"
            style={{ borderRadius: "10px 10px 0 0" }}
          >
            <div className="input-group">
              <table className="table table-borderless text-center">
                <thead>
                  <tr>
                    <th scope="col">Player ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Overall</th>
                    <th scope="col">Hard</th>
                    <th scope="col">Clay</th>
                    <th scope="col">Grass</th>
                    <th scope="col">ATP</th>
                    <th scope="col">Last Active</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">{props.props.player_id}</th>
                    <td id="name">{props.props.name}</td>
                    <td
                      contenteditable="true"
                      className="table-surface-elo"
                      id="overall"
                    >
                      <span className="table-border">3161</span>
                    </td>
                    <td
                      contenteditable="true"
                      className="table-surface-elo"
                      id="hard"
                    >
                      <input type="number" />
                    </td>
                    <td
                      contenteditable="true"
                      className="table-surface-elo"
                      id="clay"
                    >
                      <span className="table-border clay-text">2919</span>
                    </td>
                    <td
                      contenteditable="true"
                      className="table-surface-elo"
                      id="grass"
                    >
                      <span className="table-border grass-text">2824</span>
                    </td>
                    <td
                      contenteditable="true"
                      className="table-surface-elo"
                      id="atp"
                    >
                      <span className="table-border">3151</span>
                    </td>
                    <td contenteditable="true" id="lactive">
                      07/2017
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
