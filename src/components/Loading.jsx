import React, { Component } from "react";
import loadingThreadmill from "../assets/loading-threadmill.gif";
import loadingGears from "../assets/loading-gears.gif";

export const LoadingThreadmill = (props) => {
  return props.visible ? (
    <img className="loading-mini" src={loadingThreadmill} alt="loading..." />
  ) : null;
};

export const LoadingGears = () => {
  return <img className="loading-mini" src={loadingGears} alt="loading..." />;
};
