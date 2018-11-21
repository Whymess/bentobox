import React, { Component } from "react";
import uuidv4 from "uuid/v4";

// Local dependencies
import "./Application.css";
import { fetchLocations } from "../../Helpers/api.js";
import { LoadingIndication, Modal } from "../../Components/";
import { MapContainer } from "../../Containers/";

export default class ApplicationContainer extends Component {
  state = {
    isLoaded: false,
    error: "",
    results: "",
    locationToDisplay: "",
    showModal: false
  };

  componentDidMount() {
    fetchLocations().then(
      results => {
        this.addUniqueIdAndGetLonAndLat(results);
        this.setState({
          isLoaded: true
        });

      },
      error => {
        this.setState({
          isLoaded: true,
           error: 'Error....'
        });
      }
    );
  }

  addUniqueIdAndGetLonAndLat = results => {
    results = results.map(el => {
      let { address } = el;
      let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDTU5nNuHRJxvAp3WwovYv8CC-IfPsuLxg`;
      fetch(url)
        .then(res => res.json())
        .then(
          results => {
            el["cordinates"] = results.results[0]["geometry"]["location"];
            el["id"] = uuidv4();
          },
          error => {
            this.setState({
              isLoaded: true,
              error: 'Error....'
            });
          }
        );
      return el;
    });

    this.setState({
      results
    });
  };

  onMarkerClick = obj => {
    let { id } = obj;
    let { results } = this.state;
    let locationToDisplay = results.find(el => {
      return el["id"] === id;
    });

    this.setState({
      locationToDisplay,
      showModal: true
    });
  };

  handleModalClose = () => {
    this.setState({ showModal: false, locationToDisplay: "" });
  };

  render() {
    const {
      error,
      isLoaded,
      results,
      locationToDisplay,
      showModal
    } = this.state;
    if (error) {
      return (
        <div>
          <strong>Error: {error.message}</strong>
        </div>
      );
    } else if (!isLoaded) {
      return <LoadingIndication />;
    } else {
      return [
        <MapContainer
          key="one"
          onMarkerClick={this.onMarkerClick}
          results={results}
        />,
        <Modal
          showModal={showModal}
          handleModalClose={this.handleModalClose}
          locationToDisplay={locationToDisplay}
          key="two"
        />
      ];
    }
  }
}
