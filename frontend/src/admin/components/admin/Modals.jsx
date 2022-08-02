import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function EditContent(props) {
  const [show, setShow] = useState(False);
  const handleClose = () => setShow(False);
  const handleShow = () => setShow(True);
  return (
    <>
      <Button className="nextButton" onClick={handleShow}>
        Edit Content
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Fill out optional fields</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
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