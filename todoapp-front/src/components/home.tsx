import React, { useState } from "react";
import TodoList from "./todolist";
import TodoCreate from "./todocreate";
import LoginForm from "./loginform";
import RegisterForm from "./registerform";

import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { logoutUser } from "../actions/auth";
import { connect } from "react-redux";
import "./home.scss";

function Home(props) {
  const [loginForm, setLoginForm] = useState(false);
  const [registerForm, setRegisterForm] = useState(false);

  const handleLogout = () => {
    props.logoutUser();
  };

  return (
    <div className="home">
      <AppBar position="static" className="navbar">
        <Toolbar className="toolbar">
          <Typography variant="h6">Todo App</Typography>

          {props.auth.isAuthenticated === false && (
            <>
              <Button
                className="navbar-btn btn"
                onClick={() => setRegisterForm(true)}
              >
                Sign Up
              </Button>
              {registerForm && (
                <RegisterForm open={registerForm} setOpen={setRegisterForm} />
              )}

              <Button
                className="navbar-btn login"
                onClick={() => setLoginForm(true)}
              >
                Sign In
              </Button>
              {loginForm && (
                <LoginForm open={loginForm} setOpen={setLoginForm} />
              )}
            </>
          )}

          {props.auth.isAuthenticated && (
            <>
              <Typography variant="h6" className="btn">
                {props.auth.user.username}
              </Typography>
              <Button className="navbar-btn" onClick={handleLogout}>
                Sign Out
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <div className="my-todos">
        <TodoCreate />
        {props.auth.isAuthenticated && <TodoList />}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps, { logoutUser })(Home);
