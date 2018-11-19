import React from "react";
import "./LoadingIndication.css";

export default props => {
  return (
    <div className="container">
      <div className="lds-default">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
      Loading...
    </div>
  );
};
