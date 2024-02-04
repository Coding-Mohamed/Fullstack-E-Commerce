/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

function ModalPage({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thank You for Your Purchase!</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Your order has been confirmed, and you'll receive a shipping confirmation with tracking details soon.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Link to="/" onClick={handleClose}>
          <Button variant="primary">Explore More!</Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalPage;
