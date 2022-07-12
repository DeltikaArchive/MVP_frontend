import "./Search.css";
import MainNavbar from "../Components/MainNavbar";
import { Col, Row } from "react-bootstrap";
import SearchBarN from "../Components/SearchBarN";
import Property from "../Components/PropertySessions/Property";
import MainMap from "./MainMap";

export default function Search() {
  return (
    <>
      <MainNavbar />
      {/* <Sidebar /> */}
      <div
        className="flex-grow-1"
        // style={{ left: "10vw", position: "absolute", width: "90vw" }}
      >
        <SearchBarN />
        <Row className="mx-3 mt-3">
          <Col lg={7}>
            <Property />
          </Col>
          <Col lg={5} className="pe-0">
            <MainMap />
          </Col>
        </Row>
      </div>
 
    </>
  );
}
