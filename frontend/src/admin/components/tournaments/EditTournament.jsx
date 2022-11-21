import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";

import { Pencil, Windows, X } from "react-bootstrap-icons";
//Backend
import { useDispatch } from "react-redux";
import { updateTournament } from "../../../features/players/playerSlice";

export default function EditTournament({ tourney }) {
  const dispatch = useDispatch();
  //Frontend stuff
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    tourney_date: tourney.tourney_date,
    tourney_name: tourney.tourney_name,
  });

  useEffect(() => {
    setFormData({
      tourney_date: tourney.tourney_date,
      tourney_name: tourney.tourney_name,
    });
  }, [show]);

  const { tourney_date, tourney_name } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const TourneyData = {
      tourney_date,
      tourney_name,
    };
    dispatch(updateTournament([tourney.tourney_id, TourneyData]));
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
          <h5 className="modal-title">Edit Tournament Info:</h5>
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
                      <b>Date</b>
                    </th>
                    <th scope="col">
                      <b>Name</b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td scope="col">
                      <input
                        className="w-50 form-input"
                        type="number"
                        id="tourney_date"
                        name="tourney_date"
                        placeholder={tourney.tourney_date}
                        onChange={onChange}
                      />
                    </td>
                    <td scope="col">
                      <input
                        className="w-50 form-input"
                        type="text"
                        id="tourney_name"
                        name="tourney_name"
                        placeholder={tourney.tourney_name}
                        onChange={onChange}
                      />
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
