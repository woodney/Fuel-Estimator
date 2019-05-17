import React from "react";
import {
  Card,
  TextField,
  Button,
  CardContent,
  withStyles,
  Typography
} from "@material-ui/core";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "./Store/authentication/actions";

const mapDispatchToProps = dispatch => ({
  authorizeUser: (username, password) =>
    dispatch({ type: actions.AUTHENTICATE_USER, username, password })
});

const styles = {
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "royalblue"
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "75px"
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    paddingTop: "10px"
  },
  card: {
    minHeight: "400px"
  },
  link: {
    textDecoration: "none",
    color: "white"
  }
};

class Login extends React.PureComponent {
  state = {
    username: "",
    password: ""
  };
  onChange = e => {
    let username = this.state.username;
    let pwd = this.state.password;
    if (e.target.name === "username") {
      username = e.target.value;
    } else {
      pwd = e.target.value;
    }

    const userInfo = {
      username: username,
      password: pwd
    };

    this.setState({
      ...userInfo
    });
  };

  onClick = () => {
    const { authorizeUser } = this.props;
    const { username, password } = this.state;
    authorizeUser(username, password);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.cardContainer}>
        <Card classes={{ root: classes.card }}>
          <CardContent className={classes.cardContent}>
            <Typography variant="h3" align="center">
              Welcome
            </Typography>
            <TextField
              id="outlined-name"
              label="Username"
              margin="normal"
              variant="outlined"
              onChange={this.onChange}
              required
              name="username"
            />
            <TextField
              id="standard-password-input"
              type="password"
              label="Password"
              margin="normal"
              variant="outlined"
              onChange={this.onChange}
              required
              name="password"
            />
            <div className={classes.buttonsContainer}>
              <Button variant="contained" color="secondary">
                <Link
                  to="/profile"
                  className={classes.link}
                  onClick={this.onClick}
                >
                  Login
                </Link>
              </Button>
              <Button variant="contained" color="primary">
                <Link to="/register" className={classes.link}>
                  Register
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(Login));
