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
  authorizeUser: user => dispatch({ type: actions.REGISTER_USER, user })
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
  },
  divider: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    flexDirection: "column"
  }
};

class Register extends React.PureComponent {
  state = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    company: ""
  };
  onChange = e => {
    let username = this.state.username;
    let password = this.state.password;
    let firstName = this.state.firstName;
    let lastName = this.state.lastName;
    let street = this.state.street;
    let city = this.state.city;
    let state = this.state.state;
    let zipcode = this.state.zipcode;
    let company = this.state.company;

    if (e.target.name === "username") {
      username = e.target.value;
    } else if (e.target.name === "firstName") {
      firstName = e.target.value;
    } else if (e.target.name === "lastName") {
      lastName = e.target.value;
    } else if (e.target.name === "street") {
      street = e.target.value;
    } else if (e.target.name === "city") {
      city = e.target.value;
    } else if (e.target.name === "state") {
      state = e.target.value;
    } else if (e.target.name === "zipcode") {
      zipcode = e.target.value;
    } else if (e.target.name === "company") {
      company = e.target.value;
    } else {
      password = e.target.value;
    }

    const userInfo = {
      username,
      password,
      firstName,
      lastName,
      company,
      street,
      city,
      state,
      zipcode
    };

    this.setState({
      ...userInfo
    });
  };
  onClick = () => {
    const { authorizeUser } = this.props;
    const user = { ...this.state };
    console.log(user);
    authorizeUser(user);
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
            <Typography variant="subtitle1" align="center">
              Personal Information
            </Typography>
            <div className={classes.divider}>
              <TextField
                id="firstName"
                label="First name"
                margin="normal"
                variant="outlined"
                onChange={this.onChange}
                required
                name="firstName"
              />
              <TextField
                id="lastName"
                label="Last name"
                margin="normal"
                variant="outlined"
                onChange={this.onChange}
                required
                name="lastName"
              />
            </div>

            <TextField
              id="company"
              label="Company"
              margin="normal"
              variant="outlined"
              onChange={this.onChange}
              required
              name="company"
            />
            <Typography variant="subtitle1" align="center">
              Login Details
            </Typography>
            <TextField
              id="username"
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
                <Link to="/" className={classes.link}>
                  Login
                </Link>
              </Button>
              <Button variant="contained" color="primary">
                <Link to="/" className={classes.link} onClick={this.onClick}>
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
)(withStyles(styles)(Register));
