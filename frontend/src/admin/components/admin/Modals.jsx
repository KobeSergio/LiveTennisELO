import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';


export function EditRecord(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <a href="#" onClick={handleShow} className="color-1">Edit Record</a>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export function EditContent(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button onClick={handleShow} className="ms-4 px-2 btn btn-green btn-sm float-end" style={{ fontSize: "18px", borderWidth: "0px", width: "150px", height: "40px", fontWeight: "600" }}>
        Edit Content
      </Button>

      <Modal show={show} onHide={handleClose} size="xl">

        <Modal.Header closeButton className='mx-4'>
          <Modal.Title>Fill out optional fields</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row px-5 rounded">
            <aside className="col-sm-3 me-4">
              <div className="mb-3">
                <img className="player_pfpic bg-transparent border-0 img-fluid" id='player-pfpic' src={require('../../img/player_sample.png')}></img>
                <div className='row justify-content-center'>
                  <Button onClick={handleShow} className="px-2 btn btn-gray-transparent btn-sm my-3" style={{ fontSize: "16px", borderWidth: "0px", width: "120px", height: "40px", fontWeight: "600" }}>
                    Upload Image
                  </Button>
                </div>
                <div>
                  <span className='text-secondary me-4'>Player Id: </span>
                  <span className='pt-1 gc-100' id="player-id">RS0010</span>
                </div>
                <div><h1 className="fs-3 fw-bold" id="player-name">Novak Djokovic</h1></div>
              </div>
            </aside>

            <main className="col ms-3">
              <h1 className="fs-5 fw-bold mb-4">Player Information:</h1>
              <div className="row">
                <div className="col-sm-3 me-5">
                  <Form>
                    <Form.Group className="mb-3" controlId="birthdate">
                      <Form.Label>Birthdate:</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        className="form-control-border"
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="birthplace">
                      <Form.Label>Birthplace:</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        className="form-control-border"
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="height">
                      <Form.Label>Height:</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        className="form-control-border"
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="weight">
                      <Form.Label>Weight:</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        className="form-control-border"
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="plays">
                      <Form.Label>Plays:</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        className="form-control-border"
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="backhand">
                      <Form.Label>Backhand:</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        className="form-control-border"
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="coach">
                      <Form.Label>Coach:</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        className="form-control-border"
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="coach">
                      <Form.Label>Turned Pro:</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        className="form-control-border"
                        autoFocus
                      />
                    </Form.Group>
                  </Form>
                </div>


                <div className="col-sm-3 ms-5">
                  <Form>

                    <Form.Group className="mb-3" controlId="birthdate">
                      <Form.Label>Wikipedia:</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        className="form-control-border"
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="birthplace">
                      <Form.Label>Twitter:</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        className="form-control-border"
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="height">
                      <Form.Label>Facebook:</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        className="form-control-border"
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="weight">
                      <Form.Label>Instagram:</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        className="form-control-border"
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="plays">
                      <Form.Label>Nicknames:</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        className="form-control-border"
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="backhand">
                      <Form.Label>Prize Money:</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        className="form-control-border"
                        autoFocus
                      />
                    </Form.Group>

                  </Form>
                </div>
              </div>
            </main>
          </div>

        </Modal.Body>

        <Modal.Footer>

          <span className="text-left ms-5 me-auto">* Age auto generated by birthdate</span>

          <Button onClick={handleClose} className="btn btn-gray btn-sm" style={{ fontSize: "16px", borderWidth: "0px", width: "100px", height: "30px", fontWeight: "600" }}>
            Cancel
          </Button>

          <Button onClick={handleClose} className="ms-2 btn btn-green btn-sm" style={{ fontSize: "16px", borderWidth: "0px", width: "80px", height: "30px", fontWeight: "600" }}> {/* handle data here */}
            Save
          </Button>

        </Modal.Footer>

      </Modal>
    </>
  );
}

export function Graph(props) {
  return (
    <>

    </>
  )
}

export function VideoHighlights(props) {
  return (
    <>

    </>
  )
}