import React from "react";
import { Col, Row } from "react-bootstrap";
import SearchBarN from "../Components/SearchBarN";
import MainNavbar from "../Components/MainNavbar"
import MapPageN from "./MapPageN";
import SavedFiltersList from "../Components/Home/SavedFiltersList";

export default function Home() {
  return (
    <>
      <MainNavbar />
        <div
          className="flex-grow-1"
          // style={{ left: "10vw", position: "absolute", width: "90vw" }}
        >
          <SearchBarN />
          <Row className="mx-3 mt-3">
            <Col lg={7}>
              <SavedFiltersList />
            </Col>
            <Col lg={5} className="pe-0">
            <MapPageN />
            </Col>
          </Row>
        </div>
    </>
  );
}
