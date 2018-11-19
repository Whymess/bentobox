import React, { Component } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";

export default class ModalContainer extends Component {
  renderOneImage = () => {
    let { images } = this.props.locationToDisplay;
    return (
      <img
        style={{ height: "20em", position: "relative", width: "100%" }}
        alt="900x500"
        src={images[0]["url"]}
      />
    );
  };

  renderSlider = () => {
    let { images } = this.props.locationToDisplay;

    return (
      images &&
      images.map((el, i) => {
        return (
          <Carousel.Item key={i}>
            <img
              style={{ height: "20em", position: "relative", width: "100%" }}
              alt="900x500"
              src={el["url"]}
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })
    );
  };

  render() {
    let { address, name, images, hours } = this.props.locationToDisplay;
    let { handleModalClose, showModal } = this.props;

    return (
      <Modal show={showModal} onHide={() => handleModalClose()}>
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p> {address} </p>
          {images && images.length > 1 ? (
            <Carousel style={{ height: "20em", position: "relative" }}>
              {this.renderSlider()}
            </Carousel>
          ) : (
            ""
          )}

          {images && images.length === 1 ? this.renderOneImage() : ""}

          <div>{hours}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleModalClose()}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
