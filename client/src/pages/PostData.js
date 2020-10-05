// This is the page for looking at a specific post
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

function PostData(props) {
  const [post, setPost] = useState({})

  // When this component mounts, grab the post with the _id of props.match.params.id
  // e.g. localhost:3000/posts/599dcb67f0f16317844583fc
  const {id} = useParams()
  useEffect(() => {
    API.getPost(id)
      .then(res => setPost(res.data))
      .catch(err => console.log(err));
  }, [])

  return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                {post.title} 
                <br></br>
                posted by {post.username}
                <br></br>
                {post.date}
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-12 md-offset-1">
            <article>
              {/* <h1>content</h1> */}
              <p>
                {post.content}
              </p>
              <img className="avatar" src={post.photo} alt="post" />            
            </article>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Posts</Link>
          </Col>
        </Row>
      </Container>
    );
  }


export default PostData;
