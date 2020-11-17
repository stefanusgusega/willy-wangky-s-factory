import {Button,Modal} from 'react-bootstrap';

export default function Confirmation(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Confirmation Order
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.total.map((x)=> (
          <h4>You have to pay Rp.{x.total}.- </h4> ))}
        <p>
          
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button> Proceed </Button>
        <Button onClick={props.onHide} variant="danger">Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}
