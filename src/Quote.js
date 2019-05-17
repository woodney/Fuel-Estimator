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

class Quote extends React.PureComponent {
  componentDidMount() {
    const { getUserData, user } = this.props;
    const username = user && user.username;
    getUserData(username);
  }
  state = {
    gallons: 0
  };
  onChange = e => {
    let gallons = this.state.gallons;

    if (e.target.name === "gallons") {
      gallons = e.target.value;
    }

    const userInfo = {
      gallons
    };

    this.setState({
      ...userInfo
    });
  };

  render() {
    const { classes, user, address } = this.props;

    return (
      <div className={classes.container}>
        <Card>
          <CardContent className={classes.cardContent}>
            <Typography
              variant="h6"
              gutterBottom={true}
              align="center"
            >{`${user && user.company}`}</Typography>
            <TextField
              id="galloms"
              label="Number of Gallons"
              margin="normal"
              variant="outlined"
              onChange={this.onChange}
              required
              name="gallons"
            />
            <Typography
              variant="h4"
              align="center"
              gutterBottom={true}
              color="primary"
            >
              Delivery Address
            </Typography>
            <Typography
              variant="h6"
              align="center"
              gutterBottom={true}
              color="primary"
            >
              {address && address.street}
            </Typography>
            <Typography
              variant="h6"
              align="center"
              gutterBottom={true}
              color="primary"
            >
              {address && address.city}
            </Typography>
            <Typography
              variant="h6"
              align="center"
              gutterBottom={true}
              color="primary"
            >
              {address && address.state}
            </Typography>
            <Typography
              variant="h6"
              align="center"
              gutterBottom={true}
              color="primary"
            >
              {address && address.zipcode}
            </Typography>
            <TextField
              id="deliveryDate"
              label="Delivery Date"
              margin="normal"
              variant="outlined"
              onChange={this.onChange}
              required
              name="deliveryDate"
              type="date"
            />
            <Typography
              variant="h4"
              align="center"
              gutterBottom={true}
              color="primary"
            >
              Suggested Price
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom={true}>
              $324.00
            </Typography>
            <Typography
              variant="h4"
              align="center"
              gutterBottom={true}
              color="primary"
            >
              Total Amount Due
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom={true}>
              $32443.00
            </Typography>
            <Button variant="contained" color="primary">
              <Link
                to="/profile"
                className={classes.link}
                onClick={this.clickUserAddress}
              >
                Submit
              </Link>
            </Button>
            <Button variant="contained" color="primary">
              <Link to="/history" className={classes.link}>
                History
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Quote));
