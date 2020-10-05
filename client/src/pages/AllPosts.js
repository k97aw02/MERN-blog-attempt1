import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";


function AllPosts() {
  // Setting our component's initial state
  const [posts, setPosts] = useState([])

  // Load all posts and store them with setPosts
  useEffect(() => {
    loadPosts()
  }, [])

  // Loads all [posts]
  function loadPosts() {
    API.getPosts()
      .then(res => 
        setPosts(res.data)
      )
      .catch(err => console.log(err));
  };

  // Deletes a post from the database with a given id, then reloads posts from the db
  function deletePost(id) {
    API.deletePost(id)
      .then(res => loadPosts())
      .catch(err => console.log(err));
  };


    return (
      <Container fluid>
        <Row>
          
          <Col size="lg-12 lg-12">
            <Jumbotron>
              <h1>Current Posts</h1>
            </Jumbotron>
            {posts.length ? (
              <List>
                {posts.map(post => (
                  <ListItem key={post._id}>
                    <Link to={"/posts/" + post._id}>
                      <strong>
                        {post.title} 
                        <br></br>
                        posted by {post.username} at {post.date}
                        <br></br>
                        <img className="avatar" src={post.photo} alt="post" />            
                        <br></br>
                      </strong>
                    </Link>
                    {post.content}
                    <DeleteBtn onClick={() => deletePost(post._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }


export default AllPosts;
