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
          {props.canBuy=="true" && <div> Confirmation Order </div> }
        </Modal.Title>
      </Modal.Header>
      
       
          <div>
          <div style={{padding:"2%"}}>

          {props.status=="true" && props.canbuy=="true" && <h5>If you buy the ingredients,</h5>}
          {props.status=="false" && props.canbuy=="true" && <h5> You do not have enough money! </h5>}
          {props.status=="true" && props.canbuy=="true" && <h5>You will have Rp.{props.sisa} left </h5> }
          {props.status=="false" && props.canbuy=="true" && <h5> You need to have Rp.{props.sisa} more </h5>}
	  {props.canbuy=="false" && <h5> You cannot buy nothing! </h5>}
          </div>
          <div> 
          <Modal.Footer>
            {props.status=="true" && props.canbuy=="true" && <Button onClick={props.proceed}>  Proceed </Button>}
            <Button onClick={props.onHide} variant="danger">Cancel</Button>
          </Modal.Footer>
          </div>
      </div> 

          
      </Modal>
  );
}
