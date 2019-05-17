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
import { getUser, getUserAddress } from "./Store/authentication/selectors";
import _ from "lodash";

const mapStateToProps = state => {
  const user = getUser(state);
  const address = getUserAddress(state);
  return {
    user: user && user.toJS(),
    address: address && address.toJS()
  };
};

const mapDispatchToProps = dispatch => ({
  authorizeUser: user => dispatch({ type: actions.AUTHENTICATE_USER, user }),
  addUserAddress: address =>
    dispatch({ type: actions.ADD_USER_ADDRESS, address }),
  getUserData: username => dispatch({ type: actions.GET_USER_DATA, username })
});

const styles = {
  cardContent: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column"
  },
  link: {
    textDecoration: "none",
    color: "white"
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "lightslategrey"
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    paddingTop: "10px"
  }
};

class Profile extends React.PureComponent {
  componentDidMount() {
    const { getUserData, user } = this.props;
    const username = user && user.username;
    getUserData(username);
  }
  state = {
    street: "",
    city: "",
    state: "",
    zipcode: ""
  };
  onChange = e => {
    let street = this.state.street;
    let city = this.state.city;
    let state = this.state.state;
    let zipcode = this.state.zipcode;

    if (e.target.name === "street") {
      street = e.target.value;
    } else if (e.target.name === "city") {
      city = e.target.value;
    } else if (e.target.name === "state") {
      state = e.target.value;
    } else if (e.target.name === "zipcode") {
      zipcode = e.target.value;
    }

    const userInfo = {
      street,
      city,
      state,
      zipcode
    };

    this.setState({
      ...userInfo
    });
  };

  clickUserAddress = () => {
    const { addUserAddress } = this.props;
    const address = this.state;
    addUserAddress(address);
  };

  render() {
    const { classes, user, address } = this.props;

    return (
      <div className={classes.container}>
        <Card>
          <CardContent className={classes.cardContent}>
            <Typography
              variant="h4"
              align="center"
              color="secondary"
              gutterBottom={true}
            >
              Profile Information
            </Typography>
            <Typography
              variant="h6"
              gutterBottom={true}
              align="left"
            >{`${user && user.firstName} ${user && user.lastName}`}</Typography>
            <Typography
              variant="h5"
              gutterBottom={true}
              color="primary"
              align="center"
            >
              Company
            </Typography>
            <Typography variant="h6" gutterBottom={true}>{`${user &&
              user.company}`}</Typography>
            <Typography
              variant="h4"
              align="center"
              gutterBottom={true}
              color="secondary"
            >
              Address
            </Typography>
            {_.isEmpty(address) ? (
              <div className={classes.divider}>
                <div>
                  <TextField
                    id="Street"
                    label="Street"
                    margin="normal"
                    variant="outlined"
                    onChange={this.onChange}
                    required
                    name="street"
                  />
                  <TextField
                    id="city"
                    label="City"
                    margin="normal"
                    variant="outlined"
                    onChange={this.onChange}
                    required
                    name="city"
                  />
                </div>
                <div>
                  <TextField
                    id="state"
                    label="State"
                    margin="normal"
                    variant="outlined"
                    onChange={this.onChange}
                    required
                    name="state"
                  />
                  <TextField
                    id="zipcode"
                    label="Zipcode"
                    margin="normal"
                    variant="outlined"
                    onChange={this.onChange}
                    required
                    name="zipcode"
                  />
                </div>
                <Button variant="contained" color="primary">
                  <Link
                    to="/profile"
                    className={classes.link}
                    onClick={this.clickUserAddress}
                  >
                    Submit
                  </Link>
                </Button>
              </div>
            ) : (
              <React.Fragment>
                <Typography variant="subtitle1">{address.street}</Typography>
                <Typography variant="subtitle1">{address.city}</Typography>
                <Typography variant="subtitle1">{address.state}</Typography>
                <Typography variant="subtitle1">{address.zipcode}</Typography>
                <div className={classes.buttonsContainer}>
                  <Button variant="contained" color="secondary">
                    <Link to="/quote" className={classes.link}>
                      Get Fuel Quote
                    </Link>
                  </Button>
                  <Button variant="contained" color="primary">
                    <Link to="/" className={classes.link}>
                      Signout
                    </Link>
                  </Button>
                </div>
              </React.Fragment>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Profile));
