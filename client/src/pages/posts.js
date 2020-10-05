import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
//import image1 from './client/public/carpenter-working.jpg';


function Posts() {
  // Setting our component's initial state
  const [posts, setPosts] = useState([])
  const [formObject, setFormObject] = useState({})

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
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  // When the form is submitted, use the API.savePost method to save the post data
  // Then reload posts from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title && formObject.username) {
      API.savePost({
        title: formObject.title,
        username: formObject.username,
        content: formObject.content,
        photo: formObject.photo
      })
        .then(res => loadPosts())
        .catch(err => console.log(err));
    }
  };


    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Make a Post Below!</h1>
              <p>To post an image, upload it to <a href="https://postimages.org/" target="_blank" rel="noopener noreferrer">
                PostImages</a>, and paste the Direct link below.</p>
            </Jumbotron>
            <form>
              <Input
                onChange={handleInputChange}
                name="title"
                placeholder="Title"
              />
              <Input
                onChange={handleInputChange}
                name="username"
                placeholder="Username"
              />
              <Input
                onChange={handleInputChange}
                name="photo"
                placeholder="Paste an image link here with https://"
              />
              <TextArea
                onChange={handleInputChange}
                name="content"
                placeholder="Type Your Post Here"
              />
              <FormBtn
                disabled={!(formObject.username && formObject.title)}
                onClick={handleFormSubmit} >
                Press Here To Post
              </FormBtn>
            </form>
          </Col>

          <Col size="md-6 sm-12">
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
                        {/* by {post.username} */}
                        {/* <br></br>
                        {post.content} */}
                      </strong>
                    </Link>
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


export default Posts;
