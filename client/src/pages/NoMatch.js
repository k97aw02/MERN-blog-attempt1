import React from "react";
import { Col, Row, Container } from "../components/Grid";
import { Link } from "react-router-dom";
import Jumbotron from "../components/Jumbotron";

function NoMatch() {
  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>This page does not exist</h1>
            <h1>
              <span role="img" aria-label="Dissapointed Face">
                😢
              </span>
            </h1>
            <Row>
          <Col size="md-12">
            <Link to="/">Go to Main Page</Link>
          </Col>
        </Row>
          </Jumbotron>
        </Col>
        
      </Row>
      
    </Container>
  );
}

export default NoMatch;
