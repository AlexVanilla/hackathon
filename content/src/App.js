import React, { Component } from 'react';
import './App.css';
import Homepage from './containers/homepage'
import { Navbar, NavItem, Nav, NavDropdown, MenuItem, Modal } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Route, Switch, Link } from 'react-router-dom'
import QuizForm from './containers/quizForm'
import PublicQuizzes from './containers/public.quizzes'
import { create, readById, login } from './services/users.service'
import 'react-notifications/lib/notifications.css'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import cookie from 'react-cookies'


import fire from './fire'

class App extends Component {

  state = {
    messages: [],
    userId: null,
    showRegister: false,
    showLogin: false,

    formData: {
      loginUsername: '',
      loginPassword: '',
      registerUsername: '',
      registerPassword: ''
    }

  }



  componentWillMount() {

  }

  navbarUserCheck = () => {
    if (!this.state.userId) {
      return (
        <Nav pullRight>
          <NavItem onClick={this.handleRegisterShow}>
            Sign Up
          </NavItem>
          <NavItem onClick={this.handleLoginShow}>
            Login
          </NavItem>
        </Nav>
      )
    } else {
      return (
        <Nav pullRight>
          <NavDropdown eventKey={3} title="USERNAME HERE" id="basic-nav-dropdown">
            <MenuItem>My Private Quizzes</MenuItem>
            <MenuItem>My Grades</MenuItem>
            <MenuItem divider />
            <MenuItem>Logout</MenuItem>
          </NavDropdown>
        </Nav>
      )
    }
  }


  createUser = (event) => {
    const payload = { username: this.state.formData.registerUsername, password: this.state.formData.registerPassword }

    create(payload)
      .then(data => {
        this.setState({ showRegister: false })
        this.createNotification("success"), NotificationManager.success("Registration successful! Welcome to Chime In. You may now log in.", "Success!")
      })
      .catch(data => {
        console.log(data)
      })
  }

  loginUser = (event) => {
    const payload = { username: this.state.formData.loginUsername, password: this.state.formData.loginPassword }
    login(payload)
      .then(data => {
        this.setState({ showLogin: false })
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleLoginClose = () => {
    this.setState({ showLogin: false })
  }

  handleLoginShow = () => {
    this.setState({ showLogin: true })
  }

  handleRegisterClose = () => {
    this.setState({ showRegister: false })
  }

  handleRegisterShow = () => {
    this.setState({ showRegister: true })
  }

  handleChange = event => {
    let input = event.target.value
    let propertyName = event.target.name
    this.setState(prevState => {
      const newFormQuestionData = { ...prevState.formData }
      newFormQuestionData[propertyName] = input
      return {
        formData: newFormQuestionData
      }
    })
  }

  createNotification = (type) => {
    return () => {
      switch (type) {
        case 'info':
          NotificationManager.info('Info message');
          break;
        case 'success':
          NotificationManager.success('Success message', 'Title here');
          break;
        case 'warning':
          NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
          break;
        case 'error':
          NotificationManager.error('Error message', 'Click me!', 5000, () => {
            alert('callback');
          });
          break;
      }
    }
  }

  render() {

    return (
      <div className="App">

        <Navbar id="navbar" collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>Chime In</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>

              <LinkContainer to='/public-quizzes'>
                <NavItem>
                  Public Quizzes
                  </NavItem>
              </LinkContainer>

              <LinkContainer to='/quiz'>
                <NavItem>
                  Add Private Quiz
                </NavItem>
              </LinkContainer>

              <LinkContainer to='/example3'>
                <NavItem>
                  Grading
                </NavItem>
              </LinkContainer>

            </Nav>
            {this.navbarUserCheck()}
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route exact path='/' component={Homepage}></Route>
          <Route path="/quiz" component={QuizForm} />
          <Route path="/public-quizzes" component={PublicQuizzes} />
        </Switch>

        {/* LOGIN MODAL */}

        <Modal show={this.state.showLogin} onHide={this.handleLoginClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" value={this.state.formData.loginUsername} onChange={this.handleChange}
                  name="loginUsername" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={this.state.formData.loginPassword} onChange={this.handleChange}
                  name="loginPassword" />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-default">Cancel</button>
            <button className="btn btn-success" onClick={this.loginUser}>Login</button>
          </Modal.Footer>
        </Modal>

        {/* REGISTER MODAL */}

        <Modal show={this.state.showRegister} onHide={this.handleRegisterClose}>
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" value={this.state.formData.registerUsername} onChange={this.handleChange}
                  name="registerUsername" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={this.state.formData.registerPassword} onChange={this.handleChange}
                  name="registerPassword" />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" className="form-control" />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-default">Cancel</button>
            <button className="btn btn-success" onClick={this.createUser}>Register</button>
          </Modal.Footer>
        </Modal>
        <NotificationContainer />
      </div>
    );
  }
}

export default App;