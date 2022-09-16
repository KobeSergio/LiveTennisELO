import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Pencil } from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  loadRecord,
  updateRecord,
  reset,
} from "../../../features/records/recordsSlice";

export function EditRecord(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { doc_date } = useParams();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState({
    ranking: props.props.ranking,
    hard: props.props.hard,
    clay: props.props.clay,
    grass: props.props.grass,
    atp: props.props.atp,
    lactive: props.props.last_active,
  });
 
  const { ranking, hard, clay, grass, atp, lactive } = formData;
  
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );


  useEffect(() => {
    if (isError) {
    }

    if (isSuccess) {
      navigate("/admin/" + doc_date);
    }

    // dispatch(loadRecord(doc_date));
  }, [isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    const recordData = {
      ranking,
      hard,
      clay,
      grass,
      atp,
      lactive,
    };
    const routeDetails = {
      _id: props.props._id,
      doc_date: doc_date,
    };
    dispatch(updateRecord([routeDetails, recordData])).then(() => {
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
      <a href="#" onClick={handleShow} className="color-1">
        <Pencil />
      </a>
      <Modal show={show} onHide={handleClose} size="xl" centered>
        <form onSubmit={onSubmit}>
          <div
            className="py-3 bg-white rounded"
            style={{ borderRadius: "10px 10px 0 0" }}
          >
            <div className="input-group">
              <table className="table table-borderless text-center">
                <thead>
                  <tr>
                    <th style={{ width: "10%" }} scope="col">
                      Player ID
                    </th>
                    <th style={{ width: "15%" }} scope="col">
                      Name
                    </th>
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
                    <td>
                      <input
                        className="w-100 form-input"
                        type="text"
                        id="ranking"
                        name="ranking"
                        placeholder={props.props.ranking}
                        onChange={onChange}
                      />
                    </td>
                    <td>
                      <input
                        className="w-100 form-input"
                        type="text"
                        id="hard"
                        name="hard"
                        placeholder={props.props.hard}
                        onChange={onChange}
                      />
                    </td>
                    <td>
                      <input
                        className="w-100 form-input"
                        type="text"
                        id="clay"
                        name="clay"
                        placeholder={props.props.clay}
                        onChange={onChange}
                      />
                    </td>
                    <td>
                      <input
                        className="w-100 form-input"
                        type="text"
                        id="grass"
                        name="grass"
                        placeholder={props.props.grass}
                        onChange={onChange}
                      />
                    </td>
                    <td>
                      <input
                        className="w-100 form-input"
                        type="text"
                        id="atp"
                        name="atp"
                        placeholder={props.props.atp}
                        onChange={onChange}
                      />
                    </td>
                    <td>
                      <input
                        className="w-100 form-input"
                        type="text"
                        id="lactive"
                        name="lactive"
                        placeholder={props.props.last_active}
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
