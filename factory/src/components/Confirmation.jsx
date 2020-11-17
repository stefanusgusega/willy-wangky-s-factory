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
      
        {props.buy.map((x)=> (
          <div>
          <div style={{padding:"2%"}}>

          {x.status && <h5>If you buy the ingredients,</h5>}
          {!x.status && <h5> You do not have enough money! </h5>}
          {x.status&& <h5>You will have Rp.{x.sisa} left </h5> }
          {!x.status && <h5> You need to have Rp.{x.sisa} more </h5>}

          </div>
          <div>
          <Modal.Footer>
            {x.status &&<Button> Proceed </Button>}
            <Button onClick={props.onHide} variant="danger">Cancel</Button>
          </Modal.Footer>
          </div>
      </div>
          ))
        }
      </Modal>
  );
}
