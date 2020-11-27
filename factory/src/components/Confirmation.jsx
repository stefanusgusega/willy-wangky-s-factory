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
           <div> Confirmation </div> 
        </Modal.Title>
      </Modal.Header>
      
       
          <div>
          <div style={{padding:"2%"}}>
	  {props.order=="true" && <h5>It seems that you have enough ingredients to add the stock! Do you want to add it?</h5>}
	  {props.order=="false" && <h5> You don't have enough ingredients to add the stock! I suggest you buy some from the shop first! </h5>}
          {props.status=="true" && props.canbuy=="true" && <h5>If you buy the ingredients,</h5>}
          {props.status=="false" && props.canbuy=="true" && <h5> You do not have enough money! </h5>}
          {props.status=="true" && props.canbuy=="true" && <h5>You will have Rp.{props.sisa} left </h5> }
          {props.status=="false" && props.canbuy=="true" && <h5> You need to have Rp.{props.sisa} more </h5>}
	  {props.canbuy=="false" && <h5> You cannot buy nothing! </h5>}
          </div>
          <div> 
          <Modal.Footer>
            { props.status=="true" && props.canbuy=="true" && <Button onClick={props.proceed}>  Proceed </Button>}
	    { props.order =="true" && <Button onClick={props.proceed}> Proceed </Button>}
            <Button onClick={props.onHide} variant="danger">Cancel</Button>
          </Modal.Footer>
          </div>
      </div> 

          
      </Modal>
  );
}
